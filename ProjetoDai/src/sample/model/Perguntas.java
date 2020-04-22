package sample.model;

import javafx.event.ActionEvent;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;

public class Perguntas {
    public void handlebtnVoltar(ActionEvent actionEvent) {
    }

    public void handleBtnSubmeter(ActionEvent actionEvent) throws IOException {
        System.out.println("Botão Subemeter");
        Parent submeter_parent = FXMLLoader.load(getClass().getResource("/sample/view/Quiz.fxml"));
        Scene submeter_scene = new Scene(submeter_parent);
        Stage submeter_stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        submeter_stage.setScene(submeter_scene);
        submeter_stage.show();
    }
}
