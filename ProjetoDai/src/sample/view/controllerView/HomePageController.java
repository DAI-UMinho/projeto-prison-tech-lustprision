/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sample.view.controllerView;
import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

import javax.swing.*;

/**
 * FXML Controller class
 *
 * @author shenr
 */
public class HomePageController implements Initializable {

    /**
     * Initializes the controller class.
     */

    @Override
    public void initialize(URL url, ResourceBundle rb) {
        // TODO
    }

    public void handleBtnLogout(javafx.event.ActionEvent actionEvent) throws IOException {
        System.out.println("Botão Logout");
        Parent logout_parent = FXMLLoader.load(getClass().getResource("/sample/view/Login.fxml"));

        JOptionPane.showConfirmDialog(null, "Deseja fazer logout?", "Confirmação de Logout", JOptionPane.YES_NO_OPTION);

        Scene logout_scene = new Scene(logout_parent);
        Stage logout_stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        logout_stage.setScene(logout_scene);
        logout_stage.show();
    }

    public void handleBtnPerfil(ActionEvent actionEvent) throws IOException {
        System.out.println("Botão Perfil");
        Parent perfil_parent;
        perfil_parent = FXMLLoader.load(getClass().getResource("/sample/view/Perfil.fxml"));
        Scene perfil_scene = new Scene(perfil_parent);
        Stage perfil_stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        perfil_stage.setScene(perfil_scene);
        perfil_stage.show();
    }

    public void handleBtnHistorico(ActionEvent actionEvent) throws IOException {
        System.out.println("Botão Historico");
        Parent historico_parent = FXMLLoader.load(getClass().getResource("/sample/view/Historico.fxml"));
        Scene historico_scene = new Scene(historico_parent);
        Stage historico_stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        historico_stage.setScene(historico_scene);
        historico_stage.show();
    }

    public void handleBtnTrabalho(ActionEvent actionEvent) throws IOException {
        System.out.println("Botão Trabalho");
        Parent trabalho_parent = FXMLLoader.load(getClass().getResource("/sample/view/Trabalho.fxml"));
        Scene trabalho_scene = new Scene(trabalho_parent);
        Stage trabalho_stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        trabalho_stage.setScene(trabalho_scene);
        trabalho_stage.show();
    }

    public void handleBtnQuiz(ActionEvent actionEvent) throws IOException {
        System.out.println("Botão Quiz");
        Parent quiz_parent = FXMLLoader.load(getClass().getResource("/sample/view/Quiz.fxml"));
        Scene quiz_scene = new Scene(quiz_parent);
        Stage quiz_stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        quiz_stage.setScene(quiz_scene);
        quiz_stage.show();
    }

    public void handleBtnLoja(ActionEvent actionEvent) throws IOException {
        System.out.println("Botão Loja");
        Parent loja_parent = FXMLLoader.load(getClass().getResource("/sample/view/Loja.fxml"));
        Scene loja_scene = new Scene(loja_parent);
        Stage loja_stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        loja_stage.setScene(loja_scene);
        loja_stage.show();
    }

    public void handleBtnMais(ActionEvent actionEvent) throws IOException {
        System.out.println("Botão Mais");
        Parent mais_parent = FXMLLoader.load(getClass().getResource("/sample/view/Mais.fxml"));
        Scene mais_scene = new Scene(mais_parent);
        Stage mais_stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        mais_stage.setScene(mais_scene);
        mais_stage.show();
    }
}
