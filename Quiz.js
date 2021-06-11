class Quiz {
  constructor(){
    this.title = createElement('h1')
    this.input1 = createInput("Enter Your Name Here....");
    this.input2 = createInput("Enter Correct Option No..");
    this.button = createButton('Submit');
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
    gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    this.title.hide();
    this.input1.hide();
    this.button.hide();
    this.input2.hide();

    //write code to change the background color here
    //background("yellow");
    

    //write code to show a heading for showing the result of Quiz
    this.title = createElement('h1')
    this.title.html("MyQuiz Result");
    this.title.position(350, 0);

    //call getContestantInfo( ) here
    getContestantInfo(); 


    //write condition to check if contestantInfor is not undefined
    if(allContestants!==undefined){
      fill("blue");
      textSize(20);
      //write code to add a note here
      text('NOTE : Contestents who answered correct are colored green!',130,230);
    }

    

    //write code to highlight contest who answered correctly
    for(var plr in allContestants){
      var correctAns='2';

      if(correctAns===allContestants[plr].answer)
        fill('green');
      
      else{fill('red');}
    }
    
  }

}
