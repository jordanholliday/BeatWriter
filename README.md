# BeatWriter
[Play now!](http://beatwriter.herokuapp.com)

### About
BeatWriter is a browser-based typing tutor. Users type to the beat of a song while the music video plays in the background, and earn points for accurate typing.

Basically, it’s *Guitar Hero*-meets-*Mavis Beacon Teaches Typing*.

### Screenshots
##### Splash Page
![splash_page]
##### Gameplay
![gameplay]

[splash_page]: ./docs/screenshots/beatwriter_splash_page.png
[gameplay]: ./docs/screenshots/beatwriter_gameplay.png

### Implementation
In “composer” mode (currently available to admins only), you tap out a beat—using any key you want—while your chosen music video plays. The timing of each beat is persisted via the JSON API.

You can then switch to “player” mode, and type along to the beat you composed.

### Technologies Used
* React.js
* Ruby on Rails
* YouTube iFrame API
* Persisted data served via JSON API
* PostgreSQL

### Technical Details
BeatWriter is primarily React.js, plus a simple Ruby on Rails backend. Audio, video, song metadata, and beat timing come courtesy of the YouTube iFrame API.

While a video is playing, BeatWriter queries the embedded video player ~200 times per second to find the elapsed time. Once the elapsed time is greater than the time associated with the next beat in queue, the current beat increments and a new target letter is shown on screen.

Interestingly, the iFrame API provides the elapsed time with 100,000th-second precision, but only updates the time it reports about every half second (meaning it might report an elapsed time of 0.**1**2345 seconds even after 0.**5**4321 seconds have elapsed).

BeatWriter required more accurate timing info, so I implemented an internal timer as well. The `Song` component stores two “current” elapsed times in state: the `localTime`, and `youtubeTime`. `localTime` is initially set equal to `youtubeTime` time, and then incremented by 5ms every time BeatWriter queries the player for the elapsed time. When the player reports a new time, `youtubeTime` is updated, and `localTime` is again set equal to it. For all game logic, BeatWriter refers to the `localTime`.

This allows for precise beat timing, while also ensuring consistency with the YouTube-reported time.
