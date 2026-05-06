const VALID_IDS = [
  "GENMORI",
  "MORIMORI",
  "DEMO2026",
  "GACHA001",
  "VLIVER2026",
];

const RARITIES = [
  { rank: "S", probability: 3, message: "大当たり！超レア排出！" },
  { rank: "A", probability: 10, message: "やったね！レアが出ました" },
  { rank: "B", probability: 20, message: "なかなかの結果です" },
  { rank: "C", probability: 30, message: "もう一度チャレンジ！" },
  { rank: "D", probability: 37, message: "次に期待しましょう" },
];

const drawRank = () => {
  const rand = Math.random() * 100;
  let cumulative = 0;
  for (const r of RARITIES) {
    cumulative += r.probability;
    if (rand < cumulative) return r;
  }
  return RARITIES[RARITIES.length - 1];
};

export const gacha = () => {
  const $form = document.querySelector("#js-gacha-form");
  if (!$form) return;

  const $idInput = document.querySelector("#js-gacha-id-input");
  const $submitBtn = document.querySelector("#js-gacha-submit");
  const $errorMsg = document.querySelector("#js-gacha-error");
  const $rollSection = document.querySelector("#js-gacha-roll");
  const $rollBtn = document.querySelector("#js-gacha-button");
  const $resultSection = document.querySelector("#js-gacha-result");
  const $resultRank = document.querySelector("#js-gacha-result-rank");
  const $resultMessage = document.querySelector("#js-gacha-result-message");
  const $againBtn = document.querySelector("#js-gacha-again");

  const submitId = () => {
    const id = $idInput.value.trim().toUpperCase();
    if (!id) {
      $errorMsg.textContent = "IDを入力してください";
      return;
    }
    if (!VALID_IDS.includes(id)) {
      $errorMsg.textContent = "そのIDは無効です";
      return;
    }
    $errorMsg.textContent = "";
    $form.hidden = true;
    $rollSection.hidden = false;
  };

  $submitBtn.addEventListener("click", submitId);
  $idInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitId();
    }
  });

  $rollBtn.addEventListener("click", () => {
    $rollBtn.disabled = true;
    $rollBtn.textContent = "回しています...";

    setTimeout(() => {
      const result = drawRank();
      $resultRank.textContent = result.rank;
      $resultRank.dataset.rank = result.rank;
      $resultMessage.textContent = result.message;
      $rollSection.hidden = true;
      $resultSection.hidden = false;

      $rollBtn.disabled = false;
      $rollBtn.textContent = "ガチャを回す";
    }, 1200);
  });

  $againBtn.addEventListener("click", () => {
    $resultSection.hidden = true;
    $rollSection.hidden = false;
  });
};
