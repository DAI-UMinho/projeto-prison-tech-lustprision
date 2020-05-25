package sample.view.controllerView;

import javafx.event.ActionEvent;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import sample.Main;
import sample.model.Questoes;
import sample.model.Quiz;


import java.io.IOException;
import java.net.URL;
import java.util.Random;
import java.util.ResourceBundle;

public class QuestionController implements Initializable {


    public Label valuelbl;
    public Label questionlbl;

    public Button answer4;
    public Button answer3;
    public Button answer2;
    public Button answer1;

    public Label correctlbl;
    public Label wronglbl;

    static Questoes question = Main.sis.sessionatual.sessionquiz.displayQuestion();
    static boolean answered=false;

    @Override
    public void initialize(URL url, ResourceBundle rb) {
        correctlbl.setVisible(false);
        wronglbl.setVisible(false);
        valuelbl.setText(Integer.toString(question.getValorQuestao()));
        questionlbl.setText(question.getQuestao());

        Random rdm = new Random();

        switch (rdm.nextInt(4)){
            case 0:
                answer1.setText(question.getResposta());
                answer2.setText(question.getRespostaErrada(0));
                answer3.setText(question.getRespostaErrada(1));
                answer4.setText(question.getRespostaErrada(2));
                break;

            case 1:
                answer2.setText(question.getResposta());
                answer1.setText(question.getRespostaErrada(0));
                answer3.setText(question.getRespostaErrada(1));
                answer4.setText(question.getRespostaErrada(2));
                break;

            case 2:
                answer3.setText(question.getResposta());
                answer1.setText(question.getRespostaErrada(0));
                answer2.setText(question.getRespostaErrada(1));
                answer4.setText(question.getRespostaErrada(2));
                break;

            case 3:
                answer4.setText(question.getResposta());
                answer1.setText(question.getRespostaErrada(0));
                answer3.setText(question.getRespostaErrada(1));
                answer2.setText(question.getRespostaErrada(2));
                break;


        }

    }



    public void handleAnswer1(ActionEvent actionEvent) throws IOException {
        if(Main.sis.sessionatual.sessionquiz.answerQuestion(answer1.getText())){
            correctlbl.setVisible(true);
        }else wronglbl.setVisible(true);
        answered=true;
    }

    public void handleAnswer2(ActionEvent actionEvent) throws IOException {
        if(Main.sis.sessionatual.sessionquiz.answerQuestion(answer2.getText())){
            correctlbl.setVisible(true);
        }else wronglbl.setVisible(true);
        answered=true;
    }

    public void handleAnswer3(ActionEvent actionEvent) throws IOException {
        if(Main.sis.sessionatual.sessionquiz.answerQuestion(answer3.getText())){
            correctlbl.setVisible(true);
        }else wronglbl.setVisible(true);
        answered=true;
    }

    public void handleAnswer4(ActionEvent actionEvent) throws IOException {
        if(Main.sis.sessionatual.sessionquiz.answerQuestion(answer4.getText())){
            correctlbl.setVisible(true);
        }else wronglbl.setVisible(true);
        answered=true;
    }

}
