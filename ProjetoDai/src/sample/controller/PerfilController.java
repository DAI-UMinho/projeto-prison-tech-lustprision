/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sample.controller;

import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;

import javafx.event.ActionEvent;
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
public class PerfilController implements Initializable {

    /**
     * Initializes the controller class.
     */
    @Override
    public void initialize(URL url, ResourceBundle rb) {
        // TODO
    }

    public void handlebtnVoltar(ActionEvent actionEvent) throws IOException {
        System.out.println("Botão Voltar");
        Parent voltar_parent = FXMLLoader.load(getClass().getResource("/sample/view/HomePage.fxml"));
        Scene voltar_scene = new Scene(voltar_parent);
        Stage voltar_stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        voltar_stage.setScene(voltar_scene);
        voltar_stage.show();
    }

    public void handlebtnLogout(ActionEvent actionEvent) throws IOException {
        System.out.println("Botão Logout");
        Parent logout_parent = FXMLLoader.load(getClass().getResource("/sample/view/Login.fxml"));

        JOptionPane.showConfirmDialog(null, "Deseja fazer logout?", "Confirmação de Logout", JOptionPane.YES_NO_OPTION);

        Scene logout_scene = new Scene(logout_parent);
        Stage logout_stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        logout_stage.setScene(logout_scene);
        logout_stage.show();
    }
}
