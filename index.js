// じゃんけんボタン
const rockBtn = document.getElementById("rock");
const scissorsBtn = document.getElementById("scissors");
const paperBtn = document.getElementById("paper");

// ボタン：グー
rockBtn.addEventListener("click", () => {
  // playerの要素を取得
  const player = document.getElementById("player_result");
  // 選んだ手札を差し込む
  player.style.backgroundImage = "url('./images/rock.png')";
  // 対戦相手の手札が決まる
  getOpponentHand(player.style.backgroundImage);
});

// ボタン：チョキ
scissorsBtn.addEventListener("click", () => {
  // playerの要素を取得
  const player = document.getElementById("player_result");
  // 選んだ手札を差し込む
  player.style.backgroundImage = "url('./images/scissors.png')";
  // 対戦相手の手札が決まる
  getOpponentHand(player.style.backgroundImage);
});

// ボタン：パー
paperBtn.addEventListener("click", () => {
  // playerの要素を取得
  const player = document.getElementById("player_result");
  // 選んだ手札を差し込む
  player.style.backgroundImage = "url('./images/paper.png')";
  // 対戦相手の手札が決まる
  getOpponentHand(player.style.backgroundImage);
});

// 対戦相手の手札をルーレットで決める
const getOpponentHand = (player) => {
  // 1以上31未満(1~30)の数をランダムで取得（乱数）
  const rand = Math.floor(Math.random() * 30);

  // 結果を入れる要素を取得
  const result = document.getElementById("result");
  switch (true) {
    // グー
    // randが1~10
    case rand <= 10:
      // 選んだ手札を差し込む
      result.style.backgroundImage = "url('./images/rock.png')";
      // 判定
      judge(player, result.style.backgroundImage);
      break;

    // チョキ
    // randが11~20
    case rand > 11 && rand <= 20:
      // 選んだ手札を差し込む
      result.style.backgroundImage = "url('./images/scissors.png')";
      // 判定
      judge(player, result.style.backgroundImage);
      break;

    // パー
    // randが21~30
    case rand > 21 && rand <= 30:
      // 選んだ手札を差し込む
      result.style.backgroundImage = "url('./images/paper.png')";
      // 判定
      judge(player, result.style.backgroundImage);
      break;
  }
};

// 勝ち
const win = () => {
  const body = document.querySelector("body");

  // インスタンス
  const jsConfetti = new JSConfetti({ body });
  jsConfetti.addConfetti({
    confettiColors: [
      "#ff0a54",
      "#ebd842",
      "#2ca9e1",
      "#ea5506",
      "#4cff4c",
      "#a347ff",
    ],
    confettiRadius: 6,
    confettiNumber: 500,
  });

  // メッセージ変更
  const msg = document.getElementById("message_for_player");
  msg.textContent = "おめでとう！";
  msg.style.color = "#ebd842";

  // リセットボタンに変更する
  const cardBtns = document.getElementById("card_btns");
  cardBtns.innerHTML = "<button id='restart'>スタート画面へ戻る</button>";
  // スタート画面へ戻る
  const restartBtn = document.getElementById("restart");
  restartBtn.addEventListener("click", () => {
    location.reload();
  });
};

// ドロー
const draw = () => {
  const msg = document.getElementById("message_for_player");
  msg.textContent = "あいこで...";
  msg.style.color = "#ff0a54";

  // クラス名を動的に追加して、カードを揺らす
  const player = document.getElementById("player_card");
  const opponent = document.getElementById("opponent_card");

  // クラス名
  const playerClassName = player.classList.value.split(" ");

  // クラス名drawが存在していたら削除して再度追加する
  if (playerClassName.indexOf("draw") === 1) {
    // 削除
    player.classList.remove("draw");
    opponent.classList.remove("draw");
    // 要素をリフローさせるために何らかのプロパティにアクセスする
    const reflow = player.offsetWidth;
    // 追加
    player.classList.add("draw");
    opponent.classList.add("draw");
  } else {
    // 初回は追加のみ
    player.classList.add("draw");
    opponent.classList.add("draw");
  }
};

// 負け
const lose = () => {
  // メッセージを変更する
  const msg = document.getElementById("message_for_player");
  msg.textContent = "残念...もう一度挑戦してね！";
  msg.style.color = "#24315c";

  // リセットボタンに変更する
  const cardBtns = document.getElementById("card_btns");
  cardBtns.innerHTML = "<button id='restart_lose'>スタート画面へ戻る</button>";
  // スタート画面へ戻る
  const restartLoseBtn = document.getElementById("restart_lose");
  restartLoseBtn.addEventListener("click", () => {
    location.reload();
  });
};

// 判定
const judge = (player, opponent) => {
  // 画像名を抽出する
  player = player.split("/")[2];
  opponent = opponent.split("/")[2];

  // 削除した文字列
  const characterToRemove = '.png")';
  // 文字列メソッドを使って文字を削除する
  player = player.split(characterToRemove).join("");
  opponent = opponent.split(characterToRemove).join("");

  // あいこ
  if (player === opponent) {
    draw();
  }
  // グーを選んだとき
  else if (player === "rock") {
    switch (true) {
      case opponent === "scissors":
        win();
        break;
      case opponent === "paper":
        lose();
        break;
    }
  }
  // チョキを選んだとき
  else if (player === "scissors") {
    switch (true) {
      case opponent === "paper":
        win();
        break;
      case opponent === "rock":
        lose();
        break;
    }
  }
  // パーを選んだとき
  else if (player === "paper") {
    switch (true) {
      case opponent === "rock":
        win();
        break;
      case opponent === "scissors":
        lose();
        break;
    }
  }
};
