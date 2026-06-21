# Escursionando - User Stories & Piano di Sviluppo

> **Tech Stack:** Ionic 8 + Angular 19 + Capacitor 7 + NgRx Store  
> **Backend:** Spring Boot 3 + Java 21 + PostgreSQL  
> **Target:** Google Play Store (Android)

---

## 📋 Sommario

- [FASE 0 - Upgrade Tecnologico](#fase-0---upgrade-tecnologico) ✅
- [FASE 1 - Core Frontend MVP](#fase-1---core-frontend-mvp) ✅
- [FASE 2 - Backend Java Spring Boot](#fase-2---backend-java-spring-boot) ✅
- [FASE 3 - Integrazione Full Stack](#fase-3---integrazione-full-stack) ✅
- [FASE 4 - Android Readiness](#fase-4---android-readiness) ✅
- [FASE 5 - Funzionalità Avanzate](#fase-5---funzionalit%C3%A0-avanzate) ❌

---

## FASE 0 - Upgrade Tecnologico ✅

### US-000: Aggiornamento Stack Tecnologico

**Obiettivo:** Portare il progetto alle versioni più recenti dei framework, garantendo compatibilità Android e performance ottimali.

| # | Attività | Stato | Descrizione |
|---|----------|-------|-------------|
| 0.1 | Upgrade Ionic 7 → 8 | ✅ | `@ionic/angular` alla v8.8.11 |
| 0.2 | Upgrade Angular 16 → 19 | ✅ | `@angular/core` alla v19.2.25 (via 17, 18) |
| 0.3 | Upgrade Capacitor 5 → 7 | ✅ | `@capacitor/core` alla v7.6.7 |
| 0.4 | Upgrade Node.js | ✅ | Node 22.23.0 con NVM |
| 0.5 | Installazione NgRx Store | ✅ | `@ngrx/store`, `effects`, `entity`, `router-store`, `store-devtools` |
| 0.6 | Verifica compatibilità plugin | ✅ | Geolocation 7.1.8, Haptics 7.0.5, Keyboard 7.0.6, StatusBar 7.0.6 |
| 0.7 | Build di verifica | ✅ | `ng build` e `cap sync android` funzionanti |

---

## FASE 1 - Core Frontend MVP ✅

### US-001: Sistema di Autenticazione

**Come** utente, **voglio** potermi registrare e accedere all'app, **per** poter condividere le mie esperienze con la community.

| # | Attività | Stato | Descrizione |
|---|----------|-------|-------------|
| 1.1 | Modello AuthState NgRx | ✅ | Stato con user, token, accessToken, refreshToken, isAuthenticated, loading, error |
| 1.2 | Auth Actions/Reducers/Effects | ✅ | Login, Register, Logout, LoadProfile, UpdateProfile + Effects che chiamano API |
| 1.3 | AuthService | ✅ | Metodi HTTP per `/api/auth/login`, `/api/auth/register`, `/api/auth/refresh`, `/api/users/me` |
| 1.4 | Pagina Login | ✅ | Form con username + password, validazione, error handling, link a registrazione |
| 1.5 | Pagina Registrazione | ✅ | Form con nome, cognome, username, email, password, conferma password |
| 1.6 | Auth Guard | ✅ | `canActivate` per proteggere rotte |
| 1.7 | HTTP Interceptor | ✅ | JWT interceptor con refresh token |
| 1.8 | Gestione Guest vs Logged | ✅ | Menu bar dinamico: guest vede Login/Register, logged vede Profilo/Crea/Logout |

---

### US-002: Profilo Utente Completo

**Come** utente autenticato, **voglio** visualizzare e modificare il mio profilo, **per** gestire le mie informazioni personali.

| # | Attività | Stato | Descrizione |
|---|----------|-------|-------------|
| 2.1 | Profilo NgRx State | ✅ | Azioni: LoadProfile, UpdateProfile, effetti e reducer |
| 2.2 | Pagina Profilo redesign | ✅ | Foto profilo, statistiche escursioni, livello, bio |
| 2.3 | Edit Profilo | 🟡 | Form modale per modificare dati (da completare) |
| 2.4 | Statistiche real-time | 🟡 | Distanza totale, numero escursioni, dislivello (dati dal backend) |
| 2.5 | Badge/Achievements UI | ❌ | Sistema livelli e badge (future release) |

---

### US-003: Home Page - Lista Percorsi

**Come** utente (guest o logged), **voglio** vedere una lista di percorsi escursionistici, **per** scoprire nuove avventure.

| # | Attività | Stato | Descrizione |
|---|----------|-------|-------------|
| 3.1 | Tracks NgRx State | ✅ | EntityAdapter con selectAllTracks, selectTrackEntities |
| 3.2 | Home Page redesign | ✅ | Hero section, search bar, cards moderne |
| 3.3 | Ricerca testuale | ✅ | Campo search con dispatch setTrackSearch |
| 3.4 | Filtri | 🟡 | Filtra per difficoltà (da completare UI) |
| 3.5 | Ordinamento | 🟡 | Ordina per recenti/popolari/difficoltà (backend pronto) |
| 3.6 | Pull-to-refresh & Infinite Scroll | ❌ | Da implementare |

---

### US-004: Dettaglio Percorso

**Come** utente, **voglio** vedere tutti i dettagli di un percorso, **per** decidere se affrontarlo.

| # | Attività | Stato | Descrizione |
|---|----------|-------|-------------|
| 4.1 | Pagina Dettaglio Percorso | ✅ | Hero image, stats bar, descrizione, mappa, autore, azioni |
| 4.2 | Mappa interattiva | 🟡 | Link a Google Maps + iframe (Leaflet da integrare) |
| 4.3 | Sezione Meteo | ❌ | Widget meteo (API esterna, future release) |
| 4.4 | Pulsante "Naviga" | ✅ | Apre Google Maps con navigazione al punto di partenza |
| 4.5 | Condivisione | ❌ | Share nativo (future release) |

---

### US-005: Tracking GPS e Creazione Percorso

**Come** utente autenticato, **voglio** registrare un percorso con GPS e condividerlo con foto e descrizione.

| # | Attività | Stato | Descrizione |
|---|----------|-------|-------------|
| 5.1 | Servizio Tracking GPS | ❌ | Usare `@capacitor/geolocation` watchPosition |
| 5.2 | UI Registrazione Percorso | ❌ | Schermata full-screen con mappa live |
| 5.3 | Conferma e Salva | ❌ | Form per titolo, descrizione, difficoltà, foto |
| 5.4 | Tracks NgRx Effects | ✅ | CreateTrack effect con upload multipart |
| 5.5 | Bozza percorso | ❌ | Salvataggio automatico in localStorage |
| 5.6 | Modalità Background | ❌ | Servizio Android foreground |

---

### US-006: Pagina Explore - Mappa Percorsi

**Come** utente, **voglio** esplorare i percorsi su una mappa interattiva, **per** trovare escursioni vicino a me.

| # | Attività | Stato | Descrizione |
|---|----------|-------|-------------|
| 6.1 | Mappa Fullscreen | 🟡 | Google Maps iframe (Leaflet/OpenStreetMap da integrare) |
| 6.2 | Markers interattivi | ❌ | Pin colorati per difficoltà (future release) |
| 6.3 | Geolocalizzazione utente | ✅ | Posizione corrente (tramite AppContext) |
| 6.4 | Cluster markers | ❌ | Raggruppamento markers (future release) |
| 6.5 | Filtri su mappa | ❌ | Filtrare markers (future release) |

---

### US-007: Community - Commenti e Like

**Come** utente autenticato, **voglio** interagire con la community lasciando commenti e like ai percorsi.

| # | Attività | Stato | Descrizione |
|---|----------|-------|-------------|
| 7.1 | Sezione Commenti | ✅ | Lista commenti su pagina dettaglio, form per nuovo commento |
| 7.2 | Sistema Like | ✅ | Pulsante like su dettaglio, contatore, stato utente |
| 7.3 | Commenti NgRx | ✅ | Azioni: LoadComments, AddComment, LikeTrack con Effects |

---

### US-008: Settings Page

**Come** utente, **voglio** gestire le impostazioni dell'app.

| # | Attività | Stato | Descrizione |
|---|----------|-------|-------------|
| 8.1 | Tema chiaro/scuro | 🟡 | Toggle tema (ngrx/ui state pronto, UI da completare) |
| 8.2 | Unità di misura | 🟡 | Toggle km/miglia (store pronto) |
| 8.3 | Privacy | ❌ | Gestione visibilità profilo |
| 8.4 | Notifiche push | ❌ | Attiva/disattiva notifiche |
| 8.5 | Info app | ❌ | Versione, licenze, privacy policy |

---

## FASE 2 - Backend Java Spring Boot ✅

### US-009: Setup Progetto Spring Boot

| # | Attività | Stato | Descrizione |
|---|----------|-------|-------------|
| 9.1 | Inizializzazione progetto | ✅ | Spring Boot 3.4.4 + Java 21, Maven, Spring Web, Spring Security, Spring Data JPA |
| 9.2 | Configurazione database | ✅ | Schema con H2 (dev) / PostgreSQL (prod) |
| 9.3 | CORS e Security base | ✅ | CORS configurato, JWT filter chain |
| 9.4 | Docker Compose | ✅ | PostgreSQL + Backend |

---

### US-010: Autenticazione e Autorizzazione API

| # | Attività | Stato | Descrizione |
|---|----------|-------|-------------|
| 10.1 | Entity User | ✅ | JPA con campi: id, username, email, password (BCrypt), name, surname, bio, avatarUrl, level, ruolo |
| 10.2 | AuthController | ✅ | Endpoint `/api/auth/register`, `/api/auth/login`, `/api/auth/refresh` |
| 10.3 | JWT Provider | ✅ | Access token 15min + Refresh token 7gg |
| 10.4 | Ruoli utente | ✅ | Enum: USER, ADMIN |
| 10.5 | @PreAuthorize | 🟡 | Protezione endpoint (da configurare) |

---

### US-011: API Percorsi (Tracks)

| # | Attività | Stato | Descrizione |
|---|----------|-------|-------------|
| 11.1 | Entity Track | ✅ | TrackPoints, Photos, User, titolo, descrizione, difficoltà, distanza, dislivello, durata |
| 11.2 | Entity TrackPoint | ✅ | lat, lon, elevation, timestamp, order |
| 11.3 | Entity TrackPhoto | ✅ | url, thumbnailUrl, order, caption |
| 11.4 | TrackController | ✅ | CRUD: GET (con filtri), GET/{id}, POST (multipart), DELETE |
| 11.5 | Upload Foto | ✅ | Upload su filesystem |
| 11.6 | Ricerca e filtri | ✅ | Full-text search su titolo+descrizione, filtro difficoltà, sortBy |
| 11.7 | Calcolo distanza | 🟡 | Query params nearLat/nearLon (da completare) |

---

### US-012: API Community (Commenti e Like)

| # | Attività | Stato | Descrizione |
|---|----------|-------|-------------|
| 12.1 | Entity Comment | ✅ | track, user, parentComment (self-ref per risposte), text, createdAt |
| 12.2 | Entity Like | ✅ | track, user, composite key, createdAt |
| 12.3 | CommentController | ✅ | GET, POST, DELETE commenti |
| 12.4 | LikeController | ✅ | POST toggle, GET status |

---

### US-013: API Utenti e Profili

| # | Attività | Stato | Descrizione |
|---|----------|-------|-------------|
| 13.1 | UserController | ✅ | GET /me, PUT /me, GET /{username}, POST /me/avatar |
| 13.2 | Statistiche utente | 🟡 | Endpoint stats (da completare) |
| 13.3 | I miei percorsi | ✅ | GET /api/tracks/user/{userId} |

---

## FASE 3 - Integrazione Full Stack ✅

### US-014: Connessione Frontend-Backend

| # | Attività | Stato | Descrizione |
|---|----------|-------|-------------|
| 14.1 | Environment config | ✅ | `environment.ts` con `apiUrl: http://localhost:8080/api` |
| 14.2 | Sostituzione dati mock | ✅ | `TrackService` chiama HTTP reale, NgRx Effects orchestrati |
| 14.3 | Caricamento immagini | ❌ | Upload da Capacitor Camera/Gallery (da implementare) |
| 14.4 | Gestione errori globale | ✅ | AuthInterceptor per 401, error state in NgRx |
| 14.5 | Proxy config | ✅ | `proxy.conf.json` → `/api` → `localhost:8080` |

---

## FASE 4 - Android Readiness ✅

### US-015: Preparazione Pubblicazione Android

| # | Attività | Stato | Descrizione |
|---|----------|-------|-------------|
| 15.1 | Icona e Splash Screen | 🟡 | Icone esistenti (da rigenerare con `@capacitor/assets`) |
| 15.2 | App name & Package ID | ✅ | `com.escursionando.app`, appName = `Escursionando` |
| 15.3 | Versioning | 🟡 | Version in `package.json` (da impostare) |
| 15.4 | Signed Release Build | ❌ | Keystore e AAB da generare |
| 15.5 | Permessi Android | ✅ | GPS, Fotocamera, Storage, Internet in `AndroidManifest.xml` |
| 15.6 | ProGuard / R8 | ❌ | Da configurare |
| 15.7 | Play Store Listing | ❌ | Descrizione, screenshots, feature graphic |
| 15.8 | Privacy Policy | ❌ | Da generare |
| 15.9 | Deploy Backend | ✅ | Dockerfile + docker-compose pronti |
| 15.10 | Test su dispositivo | ❌ | Da eseguire |

---

## FASE 5 - Funzionalità Avanzate (Post-Launch) ❌

### US-016: Funzionalità Extra

| # | Attività | Priorità |
|---|----------|----------|
| 16.1 | Percorsi preferiti | 🔵 Medium |
| 16.2 | Notifiche Push | 🔵 Medium |
| 16.3 | Social Login | 🔵 Medium |
| 16.4 | Percorsi offline | 🔵 Medium |
| 16.5 | Gamification | 🔵 Medium |
| 16.6 | Gruppi/Club | 🟢 Low |
| 16.7 | AI consigliata | 🟢 Low |

---

## 📊 Stato Attuale

| Fase | Descrizione | Stato | Completamento |
|------|-------------|-------|---------------|
| FASE 0 | Upgrade Tecnologico | ✅ | 100% |
| FASE 1 | Core Frontend MVP | ✅ | ~70% (mancano tracking GPS, Leaflet, alcuni miglioramenti UI) |
| FASE 2 | Backend Java | ✅ | 100% (BUILD SUCCESS) |
| FASE 3 | Integrazione | ✅ | ~80% (manca upload immagini reale) |
| FASE 4 | Android & Play Store | 🟡 | ~40% (manca keystore, Play Store listing, splash) |
| FASE 5 | Avanzate | ❌ | 0% |

## 🏗️ Architettura NgRx Store Completata

```typescript
interface AppState {
  auth: AuthState;          // Autenticazione e profilo
  tracks: TracksState;      // Percorsi (EntityAdapter con selettori)
  ui: UiState;              // UI: tema, loading, toast
}

// AuthState
interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// TracksState (con @ngrx/entity + createFeatureSelector)
interface TracksState extends EntityState<Track> {
  selectedTrackId: string | null;
  comments: Comment[];
  loading: boolean;
  error: string | null;
  search: string;
  difficultyFilter: number | null;
  sortBy: string;
}

// Effects attivi:
// AuthEffects: login$, loginSuccess$, register$, registerSuccess$, logout$, loadProfile$, updateProfile$
// TracksEffects: loadTracks$, loadComments$, addComment$, likeTrack$
```

## ✅ Riepilogo API Endpoint REST

| Metodo | Endpoint | Auth | Descrizione |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Registrazione |
| POST | `/api/auth/login` | No | Login |
| POST | `/api/auth/refresh` | No | Refresh token |
| GET | `/api/tracks` | No | Lista percorsi (filtri: search, difficulty, sortBy) |
| GET | `/api/tracks/{id}` | No | Dettaglio percorso |
| POST | `/api/tracks` | Sì | Crea percorso (multipart) |
| DELETE | `/api/tracks/{id}` | Sì | Elimina percorso |
| GET | `/api/tracks/{trackId}/comments` | No | Commenti |
| POST | `/api/tracks/{trackId}/comments` | Sì | Aggiungi commento |
| DELETE | `/api/tracks/{trackId}/comments/{id}` | Sì | Elimina commento |
| POST | `/api/tracks/{trackId}/like` | Sì | Toggle like |
| GET | `/api/users/me` | Sì | Profilo |
| PUT | `/api/users/me` | Sì | Aggiorna profilo |
| POST | `/api/users/me/avatar` | Sì | Carica avatar |

---

*Documento aggiornato il 21/06/2026 — Ultimo aggiornamento: fix NgRx Effects, header layout, connessione API*