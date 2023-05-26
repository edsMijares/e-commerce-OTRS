document.addEventListener("DOMContentLoaded", function() {
  let signupButton = document.getElementById("signupButton");
  let logoHeader = document.getElementById("logoHeader");
  let inputPass = document.getElementById("passInput")
  signupButton.addEventListener("click", function(){
      window.location.replace("./signup");
  });
  
  $("input#usernameInput").on({
      keydown: function(e) {
        if (e.which == 32)
          return false;
      },
      change: function() {
        this.value = this.value.replace(/\s/g, "");
      }
  });
  $("input#passInput").on({
      keydown: function(e) {
        if (e.which == 32)
          return false;
      },
      change: function() {
        this.value = this.value.replace(/\s/g, "");
      }
  });

  inputPass.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
      event.preventDefault();
      document.getElementById("enterButton").click()
    }
  })
});
