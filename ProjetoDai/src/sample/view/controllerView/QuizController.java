/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sample.view.controllerView;
import java.awt.*;
import java.io.IOException;
import java.net.URL;
import java.util.Random;
import java.util.ResourceBundle;
import java.util.concurrent.TimeUnit;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.Pane;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import sample.Main;
import sample.controller.BD_CONTROLLER;
import sample.model.Questoes;

import javax.swing.*;

/**
 * FXML Controller class
 *
 * @author shenr
 */
public class QuizController implements Initializable {



    public Label noquizlbl;




    public Pane initiatepane;
    public Pane questionpane;

    public Label questionlbl;
    public Button answer1;
    public Button answer2;
    public Button answer3;
    public Button answer4;


    public Label wronglbl;
    public Label correctlbl;
    public Label valuelbl;
    public Label wrongnlbl;
    public Label rightnlbl;
    public  Label pointslbl;

    public Pane terminatepane;

    public boolean isAnswering=false;


    /**
     * Initializes the controller class.
     */

    @Override
    public void initialize(URL url, ResourceBundle rb) {

        questionpane.setVisible(false);
        initiatepane.setVisible(false);
        correctlbl.setVisible(false);
        terminatepane.setVisible(false);
        wronglbl.setVisible(false);

        if(Main.sis.sessionatual.sessionquiz!=null) {
            noquizlbl.setVisible(false);
            initiatepane.setVisible(true);
            isAnswering=true;

        }else{

        }
    }

    public void handleBtnLoja(ActionEvent actionEvent) throws IOException {
        if(isAnswering==true){}else{
        System.out.println("Botão Loja");
        Parent loja_parent = FXMLLoader.load(getClass().getResource("/sample/view/shop.fxml"));
        Scene loja_scene = new Scene(loja_parent);
        Stage loja_stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        loja_stage.setScene(loja_scene);
        loja_stage.show();}
    }

    public void handleBtnTrabalho(ActionEvent actionEvent) throws IOException {
        if(isAnswering==true){}else{
        System.out.println("Botão Trabalho");
        Parent trabalho_parent = FXMLLoader.load(getClass().getResource("/sample/view/work.fxml"));
        Scene trabalho_scene = new Scene(trabalho_parent);
        Stage trabalho_stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        trabalho_stage.setScene(trabalho_scene);
        trabalho_stage.show();}
    }

    public void handleBtnQuiz(ActionEvent actionEvent) throws IOException {
            if(isAnswering==true){}else{
            System.out.println("Botão Quiz");
        Parent quiz_parent = FXMLLoader.load(getClass().getResource("/sample/view/quiz.fxml"));
        Scene quiz_scene = new Scene(quiz_parent);
        Stage quiz_stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        quiz_stage.setScene(quiz_scene);
        quiz_stage.show();}
    }

    public void handleBtnPerfil(ActionEvent actionEvent) throws IOException {
        if(isAnswering==true){}else{
        System.out.println("Botão Perfil");
        Parent perfil_parent = FXMLLoader.load(getClass().getResource("/sample/view/profile.fxml"));
        Scene perfil_scene = new Scene(perfil_parent);
        Stage perfil_stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        perfil_stage.setScene(perfil_scene);
        perfil_stage.show();}
    }

    public void handleBtnSair(ActionEvent actionEvent) throws IOException {
        if(isAnswering==true){}else{
        System.out.println("Botão Perfil");
        Parent perfil_parent = FXMLLoader.load(getClass().getResource("/sample/view/login.fxml"));
        Scene perfil_scene = new Scene(perfil_parent);
        Stage perfil_stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        perfil_stage.setScene(perfil_scene);
        perfil_stage.show();}
    }

    public void handleInitiatequiz(ActionEvent actionEvent) throws IOException {
        questionpane.setVisible(true);

        initiatepane.setVisible(false);

        correctlbl.setVisible(false);
        wronglbl.setVisible(false);

        Questoes question = Main.sis.sessionatual.sessionquiz.displayQuestion();

        try {
            valuelbl.setText(Integer.toString(question.getValorQuestao()));
        }catch (Exception e){e.printStackTrace();}

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



    //----------------- answer buttons -------------------------------------------
    //----------------- answer buttons -------------------------------------------
    //----------------- answer buttons -------------------------------------------
    //----------------- answer buttons -------------------------------------------
    //----------------- answer buttons -------------------------------------------
    //----------------- answer buttons -------------------------------------------
    //----------------- answer buttons -------------------------------------------


    public void handleAnswer1(ActionEvent actionEvent) throws IOException, InterruptedException {
        correctlbl.setVisible(false);
        wronglbl.setVisible(false);

        if(Main.sis.sessionatual.sessionquiz.answerQuestion(answer1.getText())){
            correctlbl.setVisible(true);
        }else wronglbl.setVisible(true);

        if(Main.sis.sessionatual.sessionquiz.isLastquest()){
            questionpane.setVisible(false);
            terminatepane.setVisible(true);
            wrongnlbl.setText(Integer.toString(Main.sis.sessionatual.sessionquiz.getWrong_cont()));
            rightnlbl.setText(Integer.toString(Main.sis.sessionatual.sessionquiz.getRight_cont()));
            pointslbl.setText(Integer.toString(Main.sis.sessionatual.sessionquiz.getTotalpoints()));
            correctlbl.setVisible(false);
            wronglbl.setVisible(false);
            return;
        }


        Questoes question = Main.sis.sessionatual.sessionquiz.displayQuestion();

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


    public void handleAnswer2(ActionEvent actionEvent) throws IOException, InterruptedException {
        correctlbl.setVisible(false);
        wronglbl.setVisible(false);

        if(Main.sis.sessionatual.sessionquiz.answerQuestion(answer2.getText())){
            correctlbl.setVisible(true);
        }else wronglbl.setVisible(true);

        if(Main.sis.sessionatual.sessionquiz.isLastquest()){
            questionpane.setVisible(false);
            terminatepane.setVisible(true);
            correctlbl.setVisible(false);
            wronglbl.setVisible(false);
            wrongnlbl.setText(Integer.toString(Main.sis.sessionatual.sessionquiz.getWrong_cont()));
            rightnlbl.setText(Integer.toString(Main.sis.sessionatual.sessionquiz.getRight_cont()));
            pointslbl.setText(Integer.toString(Main.sis.sessionatual.sessionquiz.getTotalpoints()));
            return;
        }




        Questoes question = Main.sis.sessionatual.sessionquiz.displayQuestion();

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

    public void handleAnswer3(ActionEvent actionEvent) throws IOException, InterruptedException {
        correctlbl.setVisible(false);
        wronglbl.setVisible(false);

        if(Main.sis.sessionatual.sessionquiz.answerQuestion(answer3.getText())){
            correctlbl.setVisible(true);
        }else wronglbl.setVisible(true);

        if(Main.sis.sessionatual.sessionquiz.isLastquest()){
            questionpane.setVisible(false);
            terminatepane.setVisible(true);
            correctlbl.setVisible(false);
            wronglbl.setVisible(false);
            wrongnlbl.setText(Integer.toString(Main.sis.sessionatual.sessionquiz.getWrong_cont()));
            rightnlbl.setText(Integer.toString(Main.sis.sessionatual.sessionquiz.getRight_cont()));
            pointslbl.setText(Integer.toString(Main.sis.sessionatual.sessionquiz.getTotalpoints()));
            return;
        }





        Questoes question = Main.sis.sessionatual.sessionquiz.displayQuestion();

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

    public void handleAnswer4(ActionEvent actionEvent) throws IOException, InterruptedException {
        correctlbl.setVisible(false);
        wronglbl.setVisible(false);

        if(Main.sis.sessionatual.sessionquiz.answerQuestion(answer4.getText())){
            correctlbl.setVisible(true);
        }else wronglbl.setVisible(true);

        if(Main.sis.sessionatual.sessionquiz.isLastquest()){
            questionpane.setVisible(false);
            terminatepane.setVisible(true);
            correctlbl.setVisible(false);
            wronglbl.setVisible(false);
            wrongnlbl.setText(Integer.toString(Main.sis.sessionatual.sessionquiz.getWrong_cont()));
            rightnlbl.setText(Integer.toString(Main.sis.sessionatual.sessionquiz.getRight_cont()));
            pointslbl.setText(Integer.toString(Main.sis.sessionatual.sessionquiz.getTotalpoints()));

            return;
        }




        Questoes question = Main.sis.sessionatual.sessionquiz.displayQuestion();

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


    public void handleTerminate(ActionEvent actionEvent) throws IOException{
        BD_CONTROLLER.addCredits(Main.sis.sessionatual.nowusing.getID(),Main.sis.sessionatual.sessionquiz.getTotalpoints());
        isAnswering=false;
        Main.sis.sessionatual.resetQuiz();
        terminatepane.setVisible(false);
        noquizlbl.setVisible(true);
    }




}


