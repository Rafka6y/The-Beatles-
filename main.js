const loader=document.getElementById("loader");
const loaderNumber=document.getElementById("loaderNumber");
const loaderProgress=document.getElementById("loaderProgress");
const mainContent=document.getElementById("mainContent");
const closeButton=document.getElementById("closeMusic");

const albums=document.querySelectorAll(".container");
const music=document.getElementById("music");
const songTitle=document.getElementById("songTitle");
const nextButton=document.getElementById("next");
const prevButton=document.getElementById("prev");

/* ELEMEN PLAYER BARU */

const playPauseBtn=document.getElementById("playPauseBtn");
const progressBar=document.getElementById("progressBar");
const progressFill=document.getElementById("progressFill");
const progressHandle=document.getElementById("progressHandle");
const currentTimeEl=document.getElementById("currentTime");
const totalDurationEl=document.getElementById("totalDuration");

let current=0;
let loadingProgress=0;
let currentSongIndex=-1; /* index lagu yang sedang aktif di dalam album saat ini */
let isDraggingProgress=false;

/* PLAYLIST SETIAP ALBUM */

const playlists=[
    [
        ["01","I Saw Her Standing There","music/i-saw-her.mp3"],
        ["02","Misery","music/misery.mp3"],
        ["03","Anna (Go to Him)","music/anna.mp3"],
        ["04","Chains","music/chains.mp3"],
        ["05","Boys","music/boys.mp3"],
        ["06","Ask Me Why","music/ask-me-why.mp3"],
        ["07","Please Please Me","music/please-please-me.mp3"],
        ["08","Love Me Do","music/love-me-do.mp3"],
        ["09","P.S. I Love You","music/ps-i-love-you.mp3"],
        ["10","Baby It's You","music/baby-its-you.mp3"],
        ["11","Do You Want to Know a Secret","music/do-you-want-to-know-a-secret.mp3"],
        ["12","A Taste of Honey","music/a-taste-of-honey.mp3"],
        ["13","There's a Place","music/theres-a-place.mp3"],
        ["14","Twist and Shout","music/twist-and-shout.mp3"]
    ],

    [
        ["01","It Won't Be Long","music/it-wont-be-long.mp3"],
        ["02","All I've Got to Do","music/all-ive-got-to-do.mp3"],
        ["03","All My Loving","music/all-my-loving.mp3"],
        ["04","Don't Bother Me","music/dont-bother-me.mp3"],
        ["05","Little Child","music/little-child.mp3"],
        ["06","Till There Was You","music/till-there-was-you.mp3"],
        ["07","Please Mister Postman","music/please-mister-postman.mp3"],
        ["08","Roll Over Beethoven","music/roll-over-beethoven.mp3"],
        ["09","Hold Me Tight","music/hold-me-tight.mp3"],
        ["10","You Really Got a Hold on Me","music/you-really-got-a-hold-on-me.mp3"],
        ["11","I Wanna Be Your Man","music/i-wanna-be-your-man.mp3"],
        ["12","Devil in Her Heart","music/devil-in-her-heart.mp3"],
        ["13","Not a Second Time","music/not-a-second-time.mp3"],
        ["14","Money","music/money.mp3"]
    ],

    [
        ["01","A Hard Day's Night","music/a-hard-days-night.mp3"],
        ["02","I Should Have Known Better","music/i-should-have-known-better.mp3"],
        ["03","If I Fell","music/if-i-fell.mp3"],
        ["04","I'm Happy Just to Dance with You","music/im-happy-just-to-dance-with-you.mp3"],
        ["05","And I Love Her","music/and-i-love-her.mp3"],
        ["06","Tell Me Why","music/tell-me-why.mp3"],
        ["07","Can't Buy Me Love","music/cant-buy-me-love.mp3"],
        ["08","Any Time at All","music/any-time-at-all.mp3"],
        ["09","I'll Cry Instead","music/ill-cry-instead.mp3"],
        ["10","Things We Said Today","music/things-we-said-today.mp3"],
        ["11","When I Get Home","music/when-i-get-home.mp3"],
        ["12","You Can't Do That","music/you-cant-do-that.mp3"],
        ["13","I'll Be Back","music/ill-be-back.mp3"]
    ],

    [
        ["01","No Reply","music/no-reply.mp3"],
        ["02","I'm a Loser","music/im-a-loser.mp3"],
        ["03","Baby's in Black","music/babys-in-black.mp3"],
        ["04","Rock and Roll Music","music/rock-and-roll-music.mp3"],
        ["05","I'll Follow the Sun","music/ill-follow-the-sun.mp3"],
        ["06","Mr. Moonlight","music/mr-moonlight.mp3"],
        ["07","Kansas City / Hey-Hey-Hey-Hey!","music/kansas-city.mp3"],
        ["08","Eight Days a Week","music/eight-days-a-week.mp3"],
        ["09","Words of Love","music/words-of-love.mp3"],
        ["10","Honey Don't","music/honey-dont.mp3"],
        ["11","Every Little Thing","music/every-little-thing.mp3"],
        ["12","I Don't Want to Spoil the Party","music/i-dont-want-to-spoil-the-party.mp3"],
        ["13","What You're Doing","music/what-youre-doing.mp3"],
        ["14","Everybody's Trying to Be My Baby","music/everybodys-trying-to-be-my-baby.mp3"]
    ],

    [
        ["01","Help!","music/help.mp3"],
        ["02","The Night Before","music/the-night-before.mp3"],
        ["03","You've Got to Hide Your Love Away","music/youve-got-to-hide-your-love-away.mp3"],
        ["04","I Need You","music/i-need-you.mp3"],
        ["05","Another Girl","music/another-girl.mp3"],
        ["06","You're Going to Lose That Girl","music/youre-going-to-lose-that-girl.mp3"],
        ["07","Ticket to Ride","music/ticket-to-ride.mp3"],
        ["08","Act Naturally","music/act-naturally.mp3"],
        ["09","It's Only Love","music/its-only-love.mp3"],
        ["10","You Like Me Too Much","music/you-like-me-too-much.mp3"],
        ["11","Tell Me What You See","music/tell-me-what-you-see.mp3"],
        ["12","I Can See for Miles","music/i-can-see-for-miles.mp3"],
        ["13","I've Just Seen a Face","music/ive-just-seen-a-face.mp3"],
        ["14","Yesterday","music/yesterday.mp3"],
        ["15","Dizzy Miss Lizzy","music/dizzy-miss-lizzy.mp3"]
    ],

    [
        ["01","Drive My Car","music/drive-my-car.mp3"],
        ["02","Norwegian Wood","music/norwegian-wood.mp3"],
        ["03","You Won't See Me","music/you-wont-see-me.mp3"],
        ["04","Nowhere Man","music/nowhere-man.mp3"],
        ["05","Think for Yourself","music/think-for-yourself.mp3"],
        ["06","The Word","music/the-word.mp3"],
        ["07","Michelle","music/michelle.mp3"],
        ["08","What Goes On","music/what-goes-on.mp3"],
        ["09","Girl","music/girl.mp3"],
        ["10","I'm Looking Through You","music/im-looking-through-you.mp3"],
        ["11","In My Life","music/in-my-life.mp3"],
        ["12","Wait","music/wait.mp3"],
        ["13","If I Needed Someone","music/if-i-needed-someone.mp3"],
        ["14","Run for Your Life","music/run-for-your-life.mp3"]
    ],

    [
        ["01","Taxman","music/taxman.mp3"],
        ["02","Eleanor Rigby","music/eleanor-rigby.mp3"],
        ["03","I'm Only Sleeping","music/im-only-sleeping.mp3"],
        ["04","Love You To","music/love-you-to.mp3"],
        ["05","Here, There and Everywhere","music/here-there-and-everywhere.mp3"],
        ["06","Yellow Submarine","music/yellow-submarine.mp3"],
        ["07","She Said She Said","music/she-said-she-said.mp3"],
        ["08","Good Day Sunshine","music/good-day-sunshine.mp3"],
        ["09","And Your Bird Can Sing","music/and-your-bird-can-sing.mp3"],
        ["10","For No One","music/for-no-one.mp3"],
        ["11","Doctor Robert","music/doctor-robert.mp3"],
        ["12","I Want to Tell You","music/i-want-to-tell-you.mp3"],
        ["13","Got to Get You into My Life","music/got-to-get-you-into-my-life.mp3"],
        ["14","Tomorrow Never Knows","music/tomorrow-never-knows.mp3"]
    ],

    [
        ["01","Sgt. Pepper's Lonely Hearts Club Band","music/sgt-peppers.mp3"],
        ["02","With a Little Help from My Friends","music/with-a-little-help-from-my-friends.mp3"],
        ["03","Lucy in the Sky with Diamonds","music/lucy-in-the-sky-with-diamonds.mp3"],
        ["04","Getting Better","music/getting-better.mp3"],
        ["05","Fixing a Hole","music/fixing-a-hole.mp3"],
        ["06","She's Leaving Home","music/shes-leaving-home.mp3"],
        ["07","Being for the Benefit of Mr. Kite!","music/being-for-the-benefit-of-mr-kite.mp3"],
        ["08","Within You Without You","music/within-you-without-you.mp3"],
        ["09","When I'm Sixty-Four","music/when-im-sixty-four.mp3"],
        ["10","Lovely Rita","music/lovely-rita.mp3"],
        ["11","Good Morning Good Morning","music/good-morning-good-morning.mp3"],
        ["12","Sgt. Pepper's Lonely Hearts Club Band (Reprise)","music/sgt-peppers-reprise.mp3"],
        ["13","A Day in the Life","music/a-day-in-the-life.mp3"]
    ],

    [
        ["01","Magical Mystery Tour","music/magical-mystery-tour.mp3"],
        ["02","The Fool on the Hill","music/the-fool-on-the-hill.mp3"],
        ["03","Flying","music/flying.mp3"],
        ["04","Blue Jay Way","music/blue-jay-way.mp3"],
        ["05","Your Mother Should Know","music/your-mother-should-know.mp3"],
        ["06","I Am the Walrus","music/i-am-the-walrus.mp3"]
    ],

    [
        ["01","Back in the U.S.S.R.","music/back-in-the-ussr.mp3"],
        ["02","Dear Prudence","music/dear-prudence.mp3"],
        ["03","Glass Onion","music/glass-onion.mp3"],
        ["04","Ob-La-Di, Ob-La-Da","music/ob-la-di-ob-la-da.mp3"],
        ["05","Wild Honey Pie","music/wild-honey-pie.mp3"],
        ["06","The Continuing Story of Bungalow Bill","music/bungalow-bill.mp3"],
        ["07","While My Guitar Gently Weeps","music/while-my-guitar-gently-weeps.mp3"],
        ["08","Happiness Is a Warm Gun","music/happiness-is-a-warm-gun.mp3"],
        ["09","Martha My Dear","music/martha-my-dear.mp3"],
        ["10","I'm So Tired","music/im-so-tired.mp3"],
        ["11","Blackbird","music/blackbird.mp3"],
        ["12","Piggies","music/piggies.mp3"],
        ["13","Rocky Raccoon","music/rocky-raccoon.mp3"],
        ["14","Don't Pass Me By","music/dont-pass-me-by.mp3"],
        ["15","Why Don't We Do It in the Road?","music/why-dont-we-do-it.mp3"],
        ["16","I Will","music/i-will.mp3"],
        ["17","Julia","music/julia.mp3"]
    ],

    [
        ["01","Yellow Submarine","music/yellow-submarine.mp3"],
        ["02","Only a Northern Song","music/only-a-northern-song.mp3"],
        ["03","All Together Now","music/all-together-now.mp3"],
        ["04","Hey Bulldog","music/hey-bulldog.mp3"],
        ["05","It's All Too Much","music/its-all-too-much.mp3"]
    ],

    [
        ["01","Come Together","music/come-together.mp3"],
        ["02","Something","music/something.mp3"],
        ["03","Maxwell's Silver Hammer","music/maxwells-silver-hammer.mp3"],
        ["04","Oh! Darling","music/oh-darling.mp3"],
        ["05","Octopus's Garden","music/octopuss-garden.mp3"],
        ["06","I Want You (She's So Heavy)","music/i-want-you.mp3"],
        ["07","Here Comes the Sun","music/here-comes-the-sun.mp3"],
        ["08","Because","music/because.mp3"],
        ["09","You Never Give Me Your Money","music/you-never-give-me-your-money.mp3"],
        ["10","Sun King","music/sun-king.mp3"],
        ["11","Mean Mr. Mustard","music/mean-mr-mustard.mp3"],
        ["12","Polythene Pam","music/polythene-pam.mp3"],
        ["13","She Came in Through the Bathroom Window","music/she-came-in-through-the-bathroom-window.mp3"],
        ["14","Golden Slumbers","music/golden-slumbers.mp3"],
        ["15","Carry That Weight","music/carry-that-weight.mp3"],
        ["16","The End","music/the-end.mp3"],
        ["17","Her Majesty","music/her-majesty.mp3"]
    ],

    [
        ["01","Two of Us","music/two-of-us.mp3"],
        ["02","Dig a Pony","music/dig-a-pony.mp3"],
        ["03","Across the Universe","music/across-the-universe.mp3"],
        ["04","I Me Mine","music/i-me-mine.mp3"],
        ["05","Dig It","music/dig-it.mp3"],
        ["06","Let It Be","music/let-it-be.mp3"],
        ["07","Maggie Mae","music/maggie-mae.mp3"],
        ["08","I've Got a Feeling","music/ive-got-a-feeling.mp3"],
        ["09","One After 909","music/one-after-909.mp3"],
        ["10","The Long and Winding Road","music/the-long-and-winding-road.mp3"],
        ["11","For You Blue","music/for-you-blue.mp3"],
        ["12","Get Back","music/get-back.mp3"]
    ]
];

/* LOADER */

const loading=setInterval(()=>{
    loadingProgress+=Math.floor(Math.random()*5)+1;

    if(loadingProgress>=100){
        loadingProgress=100;
        clearInterval(loading);

        setTimeout(()=>{
            loader.classList.add("hide");
            mainContent.classList.add("show");
        },500);
    }

    loaderNumber.textContent=`${loadingProgress}%`;
    loaderProgress.style.width=`${loadingProgress}%`;
},70);

/* FORMAT WAKTU (mm:ss) */

function formatTime(seconds){

    if(isNaN(seconds)||seconds===Infinity){
        return "00:00";
    }

    const minutes=Math.floor(seconds/60);
    const secs=Math.floor(seconds%60);

    return `${String(minutes).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;
}

/* RESET TAMPILAN PLAYER */

function resetPlayerUI(){

    currentSongIndex=-1;

    progressFill.style.width="0%";
    progressHandle.style.left="0%";
    currentTimeEl.textContent="00:00";
    totalDurationEl.textContent="00:00";

    updatePlayPauseButton(false);
}

/* UPDATE TOMBOL PLAY/PAUSE */

function updatePlayPauseButton(isPlaying){
    playPauseBtn.textContent=isPlaying?"Ⅱ":"▶";
}

/* PLAYLIST */

function updatePlaylist(){

    const playlist=document.querySelector(".playlist");

    playlist.innerHTML=`
        <div class="playlist-title">
            <span>TRACKLIST</span>
        </div>
    `;

    const albumSongs=playlists[current]||[];

    albumSongs.forEach((song,index)=>{

        const songElement=document.createElement("div");

        songElement.className="song";

        songElement.innerHTML=`
            <span>${song[0]}</span>
            <p>${song[1]}</p>
        `;

        songElement.addEventListener("click",()=>{
            playSong(song,songElement,index);
        });

        playlist.appendChild(songElement);
    });

    if(albumSongs.length>0){
        songTitle.textContent=albumSongs[0][1];
    }

    resetPlayerUI();
}

/* PLAY SONG - INI YANG BENAR-BENAR MEMUTAR AUDIO */

function playSong(song,element,index){

    document.querySelectorAll(".song").forEach(item=>{
        item.classList.remove("active-song");
    });

    element.classList.add("active-song");

    songTitle.textContent=song[1];

    currentSongIndex=index;

    music.src=song[2];
    music.load();

    music.play().catch(error=>{
        console.error("Gagal memutar lagu:",error);
        console.error("Path:",music.src);
    });
}

/* NEXT SONG OTOMATIS SAAT LAGU SELESAI */

music.addEventListener("ended",()=>{

    const albumSongs=playlists[current]||[];

    if(albumSongs.length===0||currentSongIndex===-1){
        return;
    }

    let nextIndex=currentSongIndex+1;

    if(nextIndex>=albumSongs.length){
        nextIndex=0;
    }

    const nextSong=albumSongs[nextIndex];
    const songElements=document.querySelectorAll(".song");
    const nextElement=songElements[nextIndex];

    if(nextSong&&nextElement){
        playSong(nextSong,nextElement,nextIndex);
    }
});

/* ERROR HANDLING AUDIO */

music.addEventListener("error",()=>{
    console.error("Audio gagal dimuat:",music.error);
    console.error("File:",music.src);
});

/* SYNC TOMBOL PLAY/PAUSE DENGAN STATUS AUDIO ASLI */

music.addEventListener("play",()=>{
    updatePlayPauseButton(true);
});

music.addEventListener("pause",()=>{
    updatePlayPauseButton(false);
});

/* TOMBOL PLAY/PAUSE MANUAL */

playPauseBtn.addEventListener("click",()=>{

    if(!music.src){
        return;
    }

    if(music.paused){
        music.play().catch(error=>{
            console.error("Gagal memutar lagu:",error);
            console.error("Path:",music.src);
        });
    }else{
        music.pause();
    }
});

/* PROGRESS BAR - UPDATE POSISI SAAT AUDIO BERJALAN */

music.addEventListener("timeupdate",()=>{

    if(isDraggingProgress){
        return;
    }

    if(!isNaN(music.duration)&&music.duration>0){

        const percent=(music.currentTime/music.duration)*100;

        progressFill.style.width=`${percent}%`;
        progressHandle.style.left=`${percent}%`;

        currentTimeEl.textContent=formatTime(music.currentTime);
    }
});

/* DURASI TOTAL - MUNCUL SETELAH METADATA AUDIO SIAP */

music.addEventListener("loadedmetadata",()=>{
    totalDurationEl.textContent=formatTime(music.duration);
});

/* PROGRESS BAR - KLIK ATAU DRAG UNTUK PINDAH POSISI */

function seekFromEvent(clientX){

    const rect=progressBar.getBoundingClientRect();

    let offsetX=clientX-rect.left;

    offsetX=Math.max(0,Math.min(offsetX,rect.width));

    const percent=offsetX/rect.width;

    if(!isNaN(music.duration)&&music.duration>0){

        progressFill.style.width=`${percent*100}%`;
        progressHandle.style.left=`${percent*100}%`;
        currentTimeEl.textContent=formatTime(percent*music.duration);

        return percent*music.duration;
    }

    return 0;
}

/* MOUSE (DESKTOP) */

progressBar.addEventListener("mousedown",(e)=>{

    isDraggingProgress=true;

    seekFromEvent(e.clientX);
});

document.addEventListener("mousemove",(e)=>{

    if(isDraggingProgress){
        seekFromEvent(e.clientX);
    }
});

document.addEventListener("mouseup",(e)=>{

    if(isDraggingProgress){

        const newTime=seekFromEvent(e.clientX);

        music.currentTime=newTime;

        isDraggingProgress=false;
    }
});

/* TOUCH (HP) */

progressBar.addEventListener("touchstart",(e)=>{

    isDraggingProgress=true;

    seekFromEvent(e.touches[0].clientX);

},{passive:true});

progressBar.addEventListener("touchmove",(e)=>{

    if(isDraggingProgress){
        seekFromEvent(e.touches[0].clientX);
    }

},{passive:true});

progressBar.addEventListener("touchend",(e)=>{

    if(isDraggingProgress){

        const newTime=seekFromEvent(e.changedTouches[0].clientX);

        music.currentTime=newTime;

        isDraggingProgress=false;
    }
});

/* SHOW ALBUM */

function showAlbum(){

    albums.forEach((album,index)=>{
        album.classList.toggle("current",index===current);
    });

    updatePlaylist();
}

/* INITIAL */

showAlbum();

/* NEXT */

nextButton.addEventListener("click",()=>{

    closeMusic();

    current=(current+1)%albums.length;

    showAlbum();
});

/* PREVIOUS */

prevButton.addEventListener("click",()=>{

    closeMusic();

    current=(current-1+albums.length)%albums.length;

    showAlbum();
});

/* SWIPE ALBUM UNTUK HP */

let touchStartX=0;
let touchEndX=0;

const albumsArea=document.querySelector(".albums");

albumsArea.addEventListener("touchstart",(e)=>{

    touchStartX=e.changedTouches[0].screenX;

},{passive:true});

albumsArea.addEventListener("touchend",(e)=>{

    touchEndX=e.changedTouches[0].screenX;

    handleSwipe();

},{passive:true});

function handleSwipe(){

    const swipeDistance=touchEndX-touchStartX;

    if(Math.abs(swipeDistance)<50){
        return;
    }

    /* SWIPE KIRI = ALBUM BERIKUTNYA */

    if(swipeDistance<0){

        closeMusic();

        current=(current+1)%albums.length;

        showAlbum();
    }

    /* SWIPE KANAN = ALBUM SEBELUMNYA */

    if(swipeDistance>0){

        closeMusic();

        current=(current-1+albums.length)%albums.length;

        showAlbum();
    }
}

/* OPEN ALBUM */

albums.forEach((album,index)=>{

    const cover=album.querySelector("img");

    cover.addEventListener("click",()=>{

        if(index!==current){
            return;
        }

        openMusic();
    });
});

/* OPEN MUSIC - TIDAK AUTOPLAY, HANYA MEMBUKA PANEL */

function openMusic(){

    mainContent.classList.add("music-open");

    closeButton.classList.add("show-close");

    const firstSong=playlists[current]?.[0];

    if(firstSong){
        songTitle.textContent=firstSong[1];
    }

    /* Audio TIDAK diputar otomatis. User harus klik lagu atau tombol play. */
}

/* CLOSE MUSIC */

function closeMusic(){

    mainContent.classList.remove("music-open");

    closeButton.classList.remove("show-close");

    music.pause();

    music.currentTime=0;

    resetPlayerUI();
}

/* CLOSE BUTTON */

closeButton.addEventListener("click",closeMusic);