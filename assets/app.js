const App = (() => {
  const KEY = {
    sessionId: "diag_sessionId",
    gender: "diag_gender",
    answers: "diag_answers", // {Q1:"OPT2",...}
    mbti: "diag_mbti",       // {MBTI1:"E",...}
    result: "diag_resultJson"
  };

  function uuid(){
    if (crypto && crypto.randomUUID) return crypto.randomUUID();
    return "sid_" + Date.now() + "_" + Math.random().toString(16).slice(2);
  }

  function initSession(gender){
    // 既存があれば再利用（途中再開）
    const existing = localStorage.getItem(KEY.sessionId);
    const sid = existing || uuid();
    localStorage.setItem(KEY.sessionId, sid);

    const g = (gender === "male") ? "male" : "female"; // otherはfemale扱い
    localStorage.setItem(KEY.gender, g);

    // 初回なら初期化
    if (!existing){
      localStorage.setItem(KEY.answers, JSON.stringify({}));
      localStorage.setItem(KEY.mbti, JSON.stringify({}));
      localStorage.removeItem(KEY.result);
    }
    return sid;
  }

  return { KEY, initSession };
})();

