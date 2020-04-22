package sample.view.controllerView;

import javafx.event.ActionEvent;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

import javax.swing.*;
import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;

public class ShopController implements Initializable {
    @Override
    public void initialize(URL url, ResourceBundle rb) {
        // TODO
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

    public void handlebtnVoltar(ActionEvent actionEvent) throws IOException {
        System.out.println("Botão Voltar");
        Parent voltar_parent = FXMLLoader.load(getClass().getResource("/sample/view/HomePage.fxml"));
        Scene voltar_scene = new Scene(voltar_parent);
        Stage voltar_stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        voltar_stage.setScene(voltar_scene);
        voltar_stage.show();
    }
}
