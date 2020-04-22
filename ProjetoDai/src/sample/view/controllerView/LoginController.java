/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sample.view.controllerView;
import java.net.URL;
import java.util.ResourceBundle;
import javafx.fxml.Initializable;
import static java.awt.SystemColor.window;
import java.io.IOException;
import java.net.URL;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.stage.Stage;
import sample.controller.SYSTEM;

import sample.Main;
import sample.*;
/**
 * FXML Controller class
 *
 * @author shenr
 */
public class LoginController implements Initializable {
    public PasswordField txtPassword;

    @FXML
    private void handleButtonAction(ActionEvent event) throws IOException {
            System.out.println("Botão Login");
            Parent home_page_parent = FXMLLoader.load(getClass().getResource("/sample/view/sample.fxml"));
            Scene home_page_scene = new Scene(home_page_parent);
            Stage app_stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
            app_stage.setScene(home_page_scene);
            app_stage.show();

            //Main.sis.LoginTS(1234,Integer.parseInt(txtPassword.getText()))



    }

    /**
     * Initializes the controller class.
     */
    @Override
    public void initialize(URL url, ResourceBundle rb) {
        // TODO
    }

    public void oneBtn(ActionEvent actionEvent) {

    }

    public void twoBtn(ActionEvent actionEvent) {
    }

    public void threeBtn(ActionEvent actionEvent) {
    }

    public void fiveBtn(ActionEvent actionEvent) {
    }

    public void nineBtn(ActionEvent actionEvent) {
    }

    public void zeroBtn(ActionEvent actionEvent) {
    }

    public void eightBtn(ActionEvent actionEvent) {
    }

    public void sevenBtn(ActionEvent actionEvent) {
    }

    public void sixBtn(ActionEvent actionEvent) {
    }

    public void fourBtn(ActionEvent actionEvent) {
    }

    public void clearBtn(ActionEvent actionEvent) {
    }
}
