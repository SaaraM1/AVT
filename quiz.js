(function() 
 {
  var allQuestions = [{
    question: "Haluatko tehdä töitä numeroiden parissa?",
    options: ["Kyllä", "Jonkin verran", "Ehkä", "Ei"],
    answer: 2
  }, {
    question: "Pidätkö suunnittelusta, organisoinnista ja järjestyksen luomisesta?",
    options: ["Kyllä", "Jonkin verran", "Ehkä", "Ei"],
    answer: 3
  }, {
    question: "Ovatko säännöt ja lait mielestäsi tärkeitä?",
    options: ["Kyllä", "Jonkin verran", "Ehkä", "Ei"],
    answer: 1
  },{
    question: "Haluatko tehdä töitä henkilöstöhallinnon- ja kysymysten parissa?",
    options: ["Kyllä", "Jonkin verran", "Ehkä", "Ei"],
    answer: 0
  }, {
    question: "Oletko palveluhenkinen ja pidät työskentelystä erilaisten ihmisten kanssa?",
    options: ["Kyllä", "Jonkin verran", "Ehkä", "Ei"],
    answer: 1
  },{
    question: "Pidätkö rakentamisesta ja haluat nähdä käsiesi työn jäljen?",
    options: ["Kyllä", "Jonkin verran", "Ehkä", "Ei"],
    answer: 0
  },{
    question: "Pidätkö ruoanlaitosta?",
    options: ["Kyllä", "Jonkin verran", "Ehkä", "Ei"],
    answer: 0
  },{
    question: "Oletko luova, taiteellinen ja/tai musikaalinen?",
    options: ["Kyllä", "Jonkin verran", "Ehkä", "Ei"],
    answer: 3
  },{
    question: "Haaveiletko viestinnän ja tiedottamisen parissa työskentelystä?",
    options: ["Kyllä", "Jonkin verran", "Ehkä", "Ei"],
    answer: 2
  },{
    question: "Oletko kielellisesti lahjakas ja pidät uusien kielten oppimisesta?",
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
        var element = $('<div>',{id: 'question'});
        var header = $('<h2>Question No. ' + (index + 1) + ' :</h2>');
        element.append(header);

        var question = $('<p>').append(allQuestions[index].question);
        element.append(question);

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
        score.append('You scored ' + correct + ' out of ' +allQuestions.length);
        return score;
  }
})();
