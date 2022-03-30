(function() 
 {
  var allQuestions = [{
    kysymys: "Haluatko tehdä töitä numeroiden parissa?",
    options: ["Kyllä", "Jonkin verran", "Ehkä", "Ei"],
    answer: 2
  }, {
    kysymys: Haluatko tehdä töitä lasten ja nuorten parissa?",
    options: ["Kyllä", "Jonkin verran", "Ehkä", "Ei"],
    answer: 3
  }, {
    kysymys: Pidätkö vanhusten ja sairaiden auttamisesta?",
    options: ["Kyllä", "Jonkin verran", "Ehkä", "Ei"],
    answer: 1
  },{
    kysymys: "Suojeletko luontoa ja pidät huolta ympäristöstä?",
    options: ["Kyllä", "Jonkin verran", "Ehkä", "Ei"],
    answer: 0
  }, {
    kysymys: "Oletko palveluhenkinen ja pidät työskentelystä erilaisten ihmisten kanssa?",
    options: ["Kyllä", "Jonkin verran", "Ehkä", "Ei"],
    answer: 1
  },{
    kysymys: "Pidätkö rakentamisesta ja haluat nähdä käsiesi työn jäljen?",
    options: ["Kyllä", "Jonkin verran", "Ehkä", "Ei"],
    answer: 0
  },{
    kysymys: "Pidätkö ruoanlaitosta?",
    options: ["Kyllä", "Jonkin verran", "Ehkä", "Ei"],
    answer: 0
  },{
    kysymys: "Oletko luova, taiteellinen ja/tai musikaalinen?",
    options: ["Kyllä", "Jonkin verran", "Ehkä", "Ei"],
    answer: 3
  },{
    kysymys: "Vietätkö mielelläsi paljon aikaa tietokoneen ääressä?",
    options: ["Kyllä", "Jonkin verran", "Ehkä", "Ei"],
    answer: 2
  },{
    kysymys: "Oletko kielellisesti lahjakas ja pidät uusien kielten oppimisesta?",
    options: ["Kyllä", "Jonkin verran", "Ehkä", "Ei"],
    answer: 0
    }];
  
  var quesCounter = 0;
  var selectOptions = [];
  var quizSpace = $('#quiz');
    
  nextQuestion();
    
  $('#next').click(function () 
    {
        chooseOption();
        if (isNaN(selectOptions[quesCounter])) 
        {
            alert('Valitse jompikumpi');
        } 
        else 
        {
          quesCounter++;
          nextQuestion();
        }
    });
  
  $('#prev').click(function () 
    {
        chooseOption();
        quesCounter--;
        nextQuestion();
    });
  
  function createElement(index) 
    {
        var element = $('<div>',{id: 'kysymys'});
        var header = $('<h2>Question No. ' + (index + 1) + ' :</h2>');
        element.append(header);

        var question = $('<p>').append(allQuestions[index].kysymys);
        element.append(kysymys);

        var radio = radioButtons(index);
        element.append(radio);

        return element;
    }
  
  function radioButtons(index) 
    {
        var radioItems = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < allQuestions[index].options.length; i++) {
          item = $('<li>');
          input = '<input type="radio" name="answer" value=' + i + ' />';
          input += allQuestions[index].options[i];
          item.append(input);
          radioItems.append(item);
        }
        return radioItems;
  }
  
  function chooseOption() 
    {
        selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
    }
   
  function nextQuestion() 
    {
        quizSpace.fadeOut(function() 
            {
              $('#question').remove();
              if(quesCounter < allQuestions.length)
                {
                    var nextQuestion = createElement(quesCounter);
                    quizSpace.append(nextQuestion).fadeIn();
                    if (!(isNaN(selectOptions[quesCounter]))) 
                    {
                      $('input[value='+selectOptions[quesCounter]+']').prop('checked', true);
                    }
                    if(quesCounter === 1)
                    {
                      $('#prev').show();
                    } 
                    else if(quesCounter === 0)
                    {
                      $('#prev').hide();
                      $('#next').show();
                    }
                }
              else 
                {
                    var scoreRslt = displayResult();
                    quizSpace.append(scoreRslt).fadeIn();
                    $('#next').hide();
                    $('#prev').hide();
                }
        });
    }
  
  function displayResult() 
    {
        var score = $('<p>',{id: 'question'});
        var correct = 0;
        for (var i = 0; i < selectOptions.length; i++) 
        {
          if (selectOptions[i] === allQuestions[i].answer) 
          {
            correct++;
          }
        }
        score.append('Sait ' + correct + ' pistettä ' +allQuestions.length + 'stä, joten kannaattaa hakea https://www.keuda.fi/koulutukset/tieto-ja-viestintatekniikan-perustutkinto/');
        return score;
  }
})();
