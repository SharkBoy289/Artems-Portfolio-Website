# Agricola Online — Architecture Spec

> Status: **In progress / planned.** This is the build-toward spec for the
> flagship Go + Kubernetes project featured on the portfolio. It doubles as the
> case study a recruiter can read to understand the engineering thinking.

## 1. Goal

A faithful, real-time **multiplayer** adaptation of the board game *Agricola*
(2–5 players, turn-based worker placement). The system should:

- Host many independent game rooms concurrently.
- Push turn updates to all players in a room in real time.
- Survive a server restart without losing an in-flight game.
- Scale horizontally as the number of concurrent games grows.

The point of the project is to choose a problem where **Go's concurrency** and
**Kubernetes' orchestration** are genuinely the right tools — not bolted on.

## 2. Why this stack is justified

| Need | Choice | Why it fits |
| --- | --- | --- |
| Thousands of independent, long-lived game sessions | **Go** | A goroutine per game loop is cheap; channels model turn/event flow cleanly. |
| Live turn updates, low ceremony | **WebSockets** | Bidirectional, persistent; ideal for "your turn / state changed" pushes. |
| Shared, durable-enough room state across pods | **Redis** | Fast key/value + pub/sub; any pod can serve any room; reconnects survive pod churn. |
| Many scalable, stateless-ish session servers | **Kubernetes** | Horizontal Pod Autoscaler scales game-server pods to demand; this is the orchestration's reason to exist. |

A single-player or purely local game would **not** justify K8s — that honesty
is the whole point. Agricola's session-per-match shape does.

## 3. Services

```
                         ┌────────────────┐
   players (browser) ───▶│  Load Balancer │
                         └───────┬────────┘
                  ┌──────────────┼──────────────┐
                  ▼              ▼               ▼
            ┌──────────┐  ┌──────────┐    ┌──────────┐
            │  Lobby   │  │  Game    │ …  │  Game    │   (HPA-scaled pods)
            │  Service │  │  Server  │    │  Server  │
            └────┬─────┘  └────┬─────┘    └────┬─────┘
                 │             │               │
                 └─────────────┴───────────────┘
                               ▼
                         ┌───────────┐
                         │   Redis   │  rooms, sessions, pub/sub
                         └───────────┘
```

### 3.1 Lobby / matchmaking service (Go, HTTP/REST)
- Create room, list open rooms, join room (assigns a `roomId`).
- Writes room membership to Redis; returns the WebSocket endpoint to connect to.

### 3.2 Game server (Go, WebSocket)
- Owns the **authoritative game loop** for each room it hosts: one goroutine
  per active room, an inbound channel for player actions, broadcast to all
  room subscribers on state change.
- Implements the rules engine (see §4).
- Persists snapshots to Redis after every committed turn so a crashed pod's
  rooms can be rehydrated by another pod (via Redis pub/sub coordination).

### 3.3 Redis
- `room:{id}:state` — serialized authoritative game state (snapshot per turn).
- `room:{id}:members` — connected players + presence.
- Pub/sub channel per room for cross-pod fan-out if a room's players land on
  different pods.

## 4. Game domain model (the meaty Go part)

Agricola is rich enough to be a real modelling exercise:

- **Players** with a farm: fields, pastures, stables, fences, a growing family.
- **Resources:** wood, clay, reed, stone, grain, vegetables, food, animals.
- **Action board:** worker-placement spaces (claimed first-come each round).
- **Round / phase loop:** placement → harvest (field, feeding, breeding).
- **Scoring:** end-game scoring across categories with negative points for gaps.

Modelled as an explicit **state machine** with pure transition functions
(`apply(action, state) -> (state, events, error)`) — easy to test, easy to
snapshot, and the natural unit the goroutine loop drives.

## 5. WebSocket protocol (sketch)

Client → server: `{ "type": "PLACE_WORKER", "space": "...", "nonce": "..." }`
Server → clients: `{ "type": "STATE", "version": 42, "state": { … } }`
                  `{ "type": "ERROR", "nonce": "...", "reason": "..." }`

- Server is authoritative; clients render the broadcast `STATE`.
- `version` lets clients drop stale/duplicate frames.

## 6. Kubernetes deployment

- **Game-server Deployment** + **HorizontalPodAutoscaler** (scale on CPU and/or
  custom metric: active rooms per pod).
- **Lobby Deployment** (small, mostly stateless).
- **Redis** as a StatefulSet (or managed Redis to start).
- **Service + Ingress** for the load balancer; sticky-ish routing by `roomId`.
- Each service has a **Dockerfile**; manifests (or a small Helm chart) in `k8s/`.

## 7. Build milestones

1. **Rules engine in Go** — pure functions + tests for a 2-player game, no network.
2. **Single-process server** — one WebSocket server, in-memory rooms, two browser clients.
3. **Redis state** — move room state to Redis; add reconnection.
4. **Split lobby service** — matchmaking + room assignment.
5. **Containerize + local K8s** (kind/minikube) — Deployments, Service, HPA.
6. **Polish** — spectators, persistence of finished games, basic auth.

## 8. Honest scope note

v1 of *the game* doesn't need every Agricola card/edge case. The portfolio
value is the **architecture** (Go concurrency, WebSocket protocol, Redis state,
K8s scaling) plus a correct core ruleset — not 100% rules completeness.
