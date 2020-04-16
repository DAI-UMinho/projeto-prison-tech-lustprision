package sample.controller;

import javafx.event.ActionEvent;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;

public class TrabalhoController implements Initializable {
    @Override
    public void initialize(URL url, ResourceBundle rb) {
        // TODO
    }

    public void handlebtnLogout(ActionEvent actionEvent) {
    }

    public void handlebtnVoltar(ActionEvent actionEvent) throws IOException {
        System.out.print("Botão Voltar");
        Parent voltar_parent = FXMLLoader.load(getClass().getResource("/sample/view/HomePage.fxml"));
        Scene voltar_scene = new Scene(voltar_parent);
        Stage voltar_stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        voltar_stage.setScene(voltar_scene);
        voltar_stage.show();
    }
}
