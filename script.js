// ========================================
// DATA
// ========================================

let songs =
    JSON.parse(localStorage.getItem("campusSongs")) || [

        {
            id: 1,
            title: "Perfect",
            artist: "Ed Sheeran",
            contributor: "Hima",
            genre: "Pop",
            likes: 3,
            audio: ""
        },

        {
            id: 2,
            title: "Believer",
            artist: "Imagine Dragons",
            contributor: "Sneha",
            genre: "Rock",
            likes: 5,
            audio: ""
        }

    ];


let jams =
    JSON.parse(localStorage.getItem("campusJams")) || [

        {
            id: 1,
            name: "Friday Acoustic Jam",
            host: "Hima",
            date: "2026-10-10",
            time: "17:00",
            location: "College Auditorium",
            genre: "Acoustic",
            completed: false
        }

    ];


// ========================================
// SAVE DATA
// ========================================

function saveData() {

    localStorage.setItem(
        "campusSongs",
        JSON.stringify(songs)
    );

    localStorage.setItem(
        "campusJams",
        JSON.stringify(jams)
    );

}


// ========================================
// SONG FORM
// ========================================

function openSongForm() {

    document
        .getElementById("songForm")
        .classList.remove("hidden");

}


function closeSongForm() {

    document
        .getElementById("songForm")
        .classList.add("hidden");

}


// ========================================
// ADD SONG
// ========================================

function addSong() {

    const title =
        document.getElementById("songTitle").value.trim();

    const artist =
        document.getElementById("artist").value.trim();

    const contributor =
        document.getElementById("contributor").value.trim();

    const genre =
        document.getElementById("genre").value;

    const audio =
        document.getElementById("audioUrl").value.trim();


    if (
        title === "" ||
        artist === "" ||
        contributor === "" ||
        genre === ""
    ) {

        alert("Please fill all required fields.");

        return;

    }


    const song = {

        id: Date.now(),

        title: title,

        artist: artist,

        contributor: contributor,

        genre: genre,

        likes: 0,

        audio: audio

    };


    songs.push(song);

    saveData();

    displaySongs();

    updateDashboard();

    clearSongForm();

    closeSongForm();

}


// ========================================
// CLEAR SONG FORM
// ========================================

function clearSongForm() {

    document.getElementById("songTitle").value = "";

    document.getElementById("artist").value = "";

    document.getElementById("contributor").value = "";

    document.getElementById("genre").value = "";

    document.getElementById("audioUrl").value = "";

}


// ========================================
// DISPLAY SONGS
// ========================================

function displaySongs() {

    const container =
        document.getElementById("songList");

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();


    const filteredSongs =
        songs.filter(song =>

            song.title
                .toLowerCase()
                .includes(search)

            ||

            song.artist
                .toLowerCase()
                .includes(search)

            ||

            song.contributor
                .toLowerCase()
                .includes(search)

        );


    container.innerHTML = "";


    if (filteredSongs.length === 0) {

        container.innerHTML = `
            <div class="form-card">
                <h3>No songs found 🎵</h3>
                <p>Try adding a new song.</p>
            </div>
        `;

        return;

    }


    filteredSongs.forEach(song => {

        container.innerHTML += `

            <div class="song-card">

                <div class="song-icon">
                    🎵
                </div>

                <h3>
                    ${escapeHTML(song.title)}
                </h3>

                <p>
                    🎤 ${escapeHTML(song.artist)}
                </p>

                <p>
                    👤 Added by:
                    ${escapeHTML(song.contributor)}
                </p>

                <span class="genre">
                    ${escapeHTML(song.genre)}
                </span>

                <div class="song-actions">

                    <button
                        class="like-btn"
                        onclick="likeSong(${song.id})"
                    >
                        ❤️ ${song.likes}
                    </button>

                    ${
                        song.audio
                        ?
                        `
                        <button
                            class="play-btn"
                            onclick="playAudio('${song.audio}')"
                        >
                            ▶ Play
                        </button>
                        `
                        :
                        ""
                    }

                    <button
                        class="delete-btn"
                        onclick="deleteSong(${song.id})"
                    >
                        🗑 Delete
                    </button>

                </div>

            </div>

        `;

    });

}


// ========================================
// LIKE SONG
// ========================================

function likeSong(id) {

    const song =
        songs.find(song => song.id === id);

    if (song) {

        song.likes++;

        saveData();

        displaySongs();

        updateDashboard();

    }

}


// ========================================
// DELETE SONG
// ========================================

function deleteSong(id) {

    if (!confirm("Delete this song?")) {
        return;
    }


    songs =
        songs.filter(song => song.id !== id);


    saveData();

    displaySongs();

    updateDashboard();

}


// ========================================
// AUDIO
// ========================================

let currentAudio = null;


function playAudio(url) {

    if (currentAudio) {

        currentAudio.pause();

    }


    currentAudio =
        new Audio(url);

    currentAudio.play()
        .catch(() => {

            alert(
                "Unable to play this audio URL."
            );

        });

}


// ========================================
// JAM FORM
// ========================================

function openJamForm() {

    document
        .getElementById("jamForm")
        .classList.remove("hidden");

}


function closeJamForm() {

    document
        .getElementById("jamForm")
        .classList.add("hidden");

}


// ========================================
// ADD JAM
// ========================================

function addJam() {

    const name =
        document.getElementById("jamName").value.trim();

    const host =
        document.getElementById("jamHost").value.trim();

    const date =
        document.getElementById("jamDate").value;

    const time =
        document.getElementById("jamTime").value;

    const location =
        document.getElementById("jamLocation").value.trim();

    const genre =
        document.getElementById("jamGenre").value;


    if (
        name === "" ||
        host === "" ||
        date === "" ||
        time === "" ||
        location === "" ||
        genre === ""
    ) {

        alert("Please fill all jam details.");

        return;

    }


    const jam = {

        id: Date.now(),

        name: name,

        host: host,

        date: date,

        time: time,

        location: location,

        genre: genre,

        completed: false

    };


    jams.push(jam);

    saveData();

    displayJams();

    updateDashboard();

    clearJamForm();

    closeJamForm();

}


// ========================================
// CLEAR JAM FORM
// ========================================

function clearJamForm() {

    document.getElementById("jamName").value = "";

    document.getElementById("jamHost").value = "";

    document.getElementById("jamDate").value = "";

    document.getElementById("jamTime").value = "";

    document.getElementById("jamLocation").value = "";

    document.getElementById("jamGenre").value = "";

}


// ========================================
// DISPLAY JAMS
// ========================================

function displayJams() {

    const container =
        document.getElementById("jamList");

    container.innerHTML = "";


    if (jams.length === 0) {

        container.innerHTML = `

            <div class="form-card">

                <h3>No jam sessions yet 🎸</h3>

                <p>
                    Create the first campus jam session.
                </p>

            </div>

        `;

        return;

    }


    jams.forEach(jam => {

        const status =
            jam.completed
            ? "Completed"
            : "Upcoming";


        container.innerHTML += `

            <div class="jam-card">

                <h3>
                    🎸 ${escapeHTML(jam.name)}
                </h3>

                <div class="jam-info">
                    👤 Host:
                    ${escapeHTML(jam.host)}
                </div>

                <div class="jam-info">
                    📅 ${formatDate(jam.date)}
                </div>

                <div class="jam-info">
                    ⏰ ${jam.time}
                </div>

                <div class="jam-info">
                    📍 ${escapeHTML(jam.location)}
                </div>

                <div class="jam-info">
                    🎵 ${escapeHTML(jam.genre)}
                </div>

                <span
                    class="status
                    ${jam.completed ? "completed" : ""}"
                >
                    ${status}
                </span>

                <div class="jam-actions">

                    ${
                        !jam.completed
                        ?
                        `
                        <button
                            class="complete-btn"
                            onclick="completeJam(${jam.id})"
                        >
                            ✅ Complete
                        </button>
                        `
                        :
                        ""
                    }

                    <button
                        class="remove-btn"
                        onclick="deleteJam(${jam.id})"
                    >
                        🗑 Delete
                    </button>

                </div>

            </div>

        `;

    });

}


// ========================================
// COMPLETE JAM
// ========================================

function completeJam(id) {

    const jam =
        jams.find(jam => jam.id === id);


    if (jam) {

        jam.completed = true;

        saveData();

        displayJams();

        updateDashboard();

    }

}


// ========================================
// DELETE JAM
// ========================================

function deleteJam(id) {

    if (!confirm("Delete this jam session?")) {
        return;
    }


    jams =
        jams.filter(jam => jam.id !== id);


    saveData();

    displayJams();

    updateDashboard();

}


// ========================================
// DASHBOARD
// ========================================

function updateDashboard() {

    document.getElementById("songCount")
        .textContent = songs.length;


    document.getElementById("jamCount")
        .textContent = jams.length;


    const contributors =
        new Set(
            songs.map(song => song.contributor)
        );


    document.getElementById("contributorCount")
        .textContent = contributors.size;


    const likes =
        songs.reduce(
            (total, song) => total + song.likes,
            0
        );


    document.getElementById("likeCount")
        .textContent = likes;

}


// ========================================
// FORMAT DATE
// ========================================

function formatDate(date) {

    const d = new Date(date);

    return d.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


// ========================================
// SECURITY
// ========================================

function escapeHTML(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ========================================
// SCROLL
// ========================================

function scrollToPlaylist() {

    document
        .getElementById("playlist")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ========================================
// INITIAL LOAD
// ========================================

displaySongs();

displayJams();

updateDashboard();
