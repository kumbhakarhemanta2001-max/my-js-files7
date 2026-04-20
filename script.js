var qData = [
  { q: "AICTE-VAANI 3.0 স্কিমটি চালু করেছে কে?", a: "AICTE", opts: ["UGC", "NCERT", "AICTE", "NITI Aayog"] },
  { q: "AICTE-VAANI স্কিমের মূল উদ্দেশ্য কী?", a: "ভারতীয় ভাষার প্রসার", opts: ["বিদেশি ভাষা শিক্ষা", "ভারতীয় ভাষার প্রসার", "খেলাধুলা উন্নয়ন", "স্বাস্থ্য পরিষেবা"] },
  { q: "World Heritage Day কবে পালিত হয়?", a: "18 April", opts: ["15 April", "18 April", "21 April", "25 April"] },
  { q: "World Heritage Day প্রথম কবে পালিত হয়?", a: "1983", opts: ["1980", "1983", "1990", "2000"] },
  { q: "World Heritage Day কে ঘোষণা করে?", a: "ICOMOS", opts: ["UNESCO", "WHO", "ICOMOS", "UNICEF"] },
  { q: "Vikram Sodhi Centre কোথায় স্থাপিত হয়েছে?", a: "IIT Kharagpur", opts: ["IIT Delhi", "IIT Bombay", "IIT Kharagpur", "IIT Madras"] },
  { q: "Vikram Sodhi Centre মূলত কোন বিষয়ে কাজ করবে?", a: "Mining + AI", opts: ["Agriculture", "Mining + AI", "Space Research", "Medicine"] },
  { q: "Night Parrot কোন দেশের পাখি?", a: "Australia", opts: ["India", "USA", "Australia", "Brazil"] },
  { q: "Night Parrot-এর বৈশিষ্ট্য কী?", a: "বিরল ও elusive", opts: ["সাধারণ পাখি", "বিরল ও elusive", "জলজ প্রাণী", "উড়তে পারে না"] },
  { q: "Night Parrot sighting কেন গুরুত্বপূর্ণ?", a: "major breakthrough", opts: ["নতুন প্রজাতি", "extinct প্রমাণ", "major breakthrough", "সাধারণ ঘটনা"] },
  { q: "Miss Sake India 2026-এর বিজয়ী কে?", a: "Nishita Antarkar", opts: ["Riya Sharma", "Nishita Antarkar", "Pooja Singh", "Ananya Das"] },
  { q: "Miss Sake India 2026 কোথায় অনুষ্ঠিত হয়?", a: "Mumbai", opts: ["Delhi", "Kolkata", "Mumbai", "Chennai"] },
  { q: "Miss Sake India-এর মূল উদ্দেশ্য কী?", a: "Cultural exchange", opts: ["Sports promotion", "Cultural exchange", "Education", "Politics"] },
  { q: "Boulders Classic 2026-এর বিজয়ী কে?", a: "Shubhankar Sharma", opts: ["Virat Kohli", "Shubhankar Sharma", "Rohit Sharma", "Neeraj Chopra"] },
  { q: "Boulders Classic 2026 কী ধরনের ইভেন্ট?", a: "Golf", opts: ["Cricket", "Football", "Golf", "Tennis"] },
  { q: "Boulders Classic 2026-এর বিশেষত্ব কী?", a: "প্রথম সংস্করণ", opts: ["শেষ সংস্করণ", "প্রথম সংস্করণ", "বাতিল", "আন্তর্জাতিক নয়"] },
  { q: "Women’s T20I Challenge Trophy 2026 আয়োজন করেছে কে?", a: "ICC", opts: ["BCCI", "ICC", "ACC", "PCB"] },
  { q: "Women’s T20I Challenge Trophy 2026 কোথায় অনুষ্ঠিত হবে?", a: "Rwanda", opts: ["India", "England", "Rwanda", "Australia"] },
  { q: "Women’s T20I Challenge Trophy-এর উদ্দেশ্য কী?", a: "মহিলা ক্রিকেট প্রসার", opts: ["পুরুষ ক্রিকেট উন্নয়ন", "মহিলা ক্রিকেট প্রসার", "Olympics প্রস্তুতি", "Test cricket"] },
  { q: "Women’s T20I Challenge Trophy 2026-এর প্রকৃতি কী?", a: "প্রথম সংস্করণ", opts: ["বার্ষিক পুরনো টুর্নামেন্ট", "প্রথম সংস্করণ", "বাতিল ইভেন্ট", "শুধুমাত্র India"] }
]; 
var curQ = 0, userScore = 0, qTimer, secLeft = 15;

function beginQuizNow() {
    document.getElementById("start-area").style.display = "none";
    document.getElementById("quiz-main-container").style.display = "block";
    loadQuestion();
}

function loadQuestion() {
    if (curQ >= qData.length) { showResult(); return; }
    secLeft = 15;
    document.getElementById("timer-box").innerHTML = secLeft;
    document.getElementById("quiz-progress").innerHTML = "প্রশ্ন: " + (curQ + 1) + "/" + qData.length;
    document.getElementById("main-q-text").innerHTML = qData[curQ].q;
    
    var optsHtml = "";
    qData[curQ].opts.forEach(opt => {
        optsHtml += `<button class="opt-btn" onclick="checkAnswer(this, '${opt}')">${opt}</button>`;
    });
    document.getElementById("main-opt-container").innerHTML = optsHtml;
    startTimer();
}

function startTimer() {
    clearInterval(qTimer);
    qTimer = setInterval(() => {
        secLeft--;
        document.getElementById("timer-box").innerHTML = secLeft;
        if (secLeft <= 0) { 
            clearInterval(qTimer);
            checkAnswer(null, ""); 
        }
    }, 1000);
}

function checkAnswer(btn, selected) {
    clearInterval(qTimer);
    var correct = qData[curQ].a.trim();
    var btns = document.getElementsByClassName("opt-btn");
    
    // সঠিক উত্তর হাইলাইট করা
    for (let b of btns) {
        b.disabled = true;
        if (b.innerText.trim() === correct) {
            b.classList.add("correct-ans");
        }
    }

    
    if (selected.trim() === correct) {
        userScore++;
        document.getElementById("score-val").innerText = userScore;
    } else if (btn) {
        btn.classList.add("wrong-ans");
    }

    curQ++;
    setTimeout(loadQuestion, 1500);
}

function showResult() {
    document.getElementById("question-area").style.display = "none";
    document.getElementById("result-area").style.display = "block";
    
    var finalScore = userScore;
    var totalQ = qData.length;
    var feedback = "";
    var color = "";

    
    if (finalScore === totalQ) {
        feedback = "Outstanding! 🌟";
        color = "#388e3c";
    } else if (finalScore >= totalQ * 0.8) {
        feedback = "Very Good! 👏";
        color = "#0d47a1";
    } else if (finalScore >= totalQ * 0.5) {
        feedback = "Good! 👍";
        color = "#f57c00";
    } else {
        feedback = "Need More Practice! 📚";
        color = "#d32f2f";
    }

    document.getElementById("res-score").innerHTML = `
        <div style="color: ${color}; font-weight: bold; margin-bottom: 10px;">${feedback}</div>
        <div style="font-size: 2.5rem;">${finalScore} / ${totalQ}</div>
    `;
}
