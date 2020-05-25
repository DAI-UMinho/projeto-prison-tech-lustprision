package sample.view.controllerView;

import javafx.event.ActionEvent;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;

import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;

public class QuizinitiateController implements Initializable {



    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {

    }

    public void handleBtnInitiate(ActionEvent actionEvent) throws IOException {
        QuizController.question=1;
        QuizController x = new QuizController();
    }

}
