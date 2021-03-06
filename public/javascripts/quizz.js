var form = function () {
    var questions = {
        sessionID: String,
        userID: String,
        questionsAnswers: []
    };

    var question = {
        numQuestion: Number,
        answersNum: []
    };


    $("#formulaire").hide();
    var displayForm = function () {
        $("#start").click(function () {
            $("#formulaire").show();
        });
    };

    var submitForm = function () {
        $("#answers").click(function () {

            var fields = $("form").serializeArray();
            var nbrQuestions = $(".alert").length;
            console.log(fields);
            for (let index = 0; index < nbrQuestions; index++) {
                var question1 = new Object();
                var answer1;
                question1.numQuestion = index + 1;
                answer1 = [];
                for (let i = 0; i < fields.length; i++) {
                    if (parseInt(fields[i].name) === index + 1) {
                        answer1.push(parseInt(fields[i].value));
                    }

                }
                question1.answersNum = answer1;
                questions.questionsAnswers.push(question1);
            }

            questions.sessionID = $("#session").text();
            questions.userID = $("#userID").text();
            console.log(questions);

            //add sessionID & userID
            var res = JSON.stringify(questions);

            //send data with AJAX 
            $.ajax({
                type: "POST",
                data: res,
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                url: "http://localhost:9000/answer",
                success: function (msg) {
                    $('.answer').html(msg);
                }
            });
        });
    };

    return {
        init: function () {
            displayForm();
            submitForm();
        }
    };

}();
//== Initialization
jQuery(document).ready(function () {
    form.init();
});