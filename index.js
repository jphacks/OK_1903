let user_id = 0;
window.onload = function () {
    getNewJinn();
    getQuestion();
};

function getNewJinn() {
    const request = new XMLHttpRequest();

    request.open('GET', 'http://localhost:5000/jinn/new', true);
    request.responseType = 'json';

    request.onload = function () {
        const resp = this.response;
        console.log(resp);
        user_id = resp.user_id;
    };

    request.send();
}

function onClick(elmnt, choice) {
  console.log(choice);
  postChoice(choice);

}

function getQuestion() {
  const request = new XMLHttpRequest();

  request.open('GET', `http://localhost:5000/jinn/${user_id}/question`, true);
  request.responseType = 'json';

  request.onload = function () {
      const resp = this.response;
      console.log(resp);
      document.getElementById('question').innerText = resp.question
  };

  request.send();
}

function postChoice(choice) {
  const request = new XMLHttpRequest();

  const data = {answer: choice};

  request.open('POST', `http://localhost:5000/jinn/${user_id}/choice`, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("Access-Control-Request-Method","POST");
  request.setRequestHeader("Access-Control-Request-Headers","Content-Type");
  request.setRequestHeader("Origin","http://localhost:5000");

  request.onload = function () {
      const resp = this.response;
      console.log(resp);
  };

  request.send(JSON.stringify(data));
}
