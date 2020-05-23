package sample.view.controllerView;

import javafx.event.ActionEvent;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import sample.Main;

import javax.swing.*;
import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;

public class ShopController implements Initializable {
    public VBox productvbox;
    public Label saldo;

    @Override
    public void initialize(URL url, ResourceBundle rb) {

        saldo.setText(Main.sis.sessionatual.nowusing.getSaldo());
        int sz = Main.sis.products.size();
        System.out.println(sz);
        Node[] nodes = new Node[sz];

        for(int i = 0 ; i< sz; i++){
            try{

                ProductLineController.name=Main.sis.products.get(i).type.getNome();
                ProductLineController.price=Main.sis.products.get(i).type.getPreco();

                nodes[i] = FXMLLoader.load(getClass().getResource("/sample/view/product_line.fxml"));
                productvbox.getChildren().add(nodes[i]);

            } catch (IOException e){
                e.printStackTrace();
            }

        }



    }



    public void handleBtnLoja(ActionEvent actionEvent) throws IOException {
        System.out.println("Botão Loja");
        Parent loja_parent = FXMLLoader.load(getClass().getResource("/sample/view/shop.fxml"));
        Scene loja_scene = new Scene(loja_parent);
        Stage loja_stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        loja_stage.setScene(loja_scene);
        loja_stage.show();
    }

    public void handleBtnTrabalho(ActionEvent actionEvent) throws IOException {
        System.out.println("Botão Trabalho");
        Parent trabalho_parent = FXMLLoader.load(getClass().getResource("/sample/view/work.fxml"));
        Scene trabalho_scene = new Scene(trabalho_parent);
        Stage trabalho_stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        trabalho_stage.setScene(trabalho_scene);
        trabalho_stage.show();
    }

    public void handleBtnQuiz(ActionEvent actionEvent) throws IOException {
        System.out.println("Botão Quiz");
        Parent quiz_parent = FXMLLoader.load(getClass().getResource("/sample/view/quiz.fxml"));
        Scene quiz_scene = new Scene(quiz_parent);
        Stage quiz_stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        quiz_stage.setScene(quiz_scene);
        quiz_stage.show();
    }

    public void handleBtnPerfil(ActionEvent actionEvent) throws IOException {
        System.out.println("Botão Perfil");
        Parent perfil_parent = FXMLLoader.load(getClass().getResource("/sample/view/profile.fxml"));
        Scene perfil_scene = new Scene(perfil_parent);
        Stage perfil_stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        perfil_stage.setScene(perfil_scene);
        perfil_stage.show();
    }

    public void handleBtnSair(ActionEvent actionEvent) throws IOException {
        System.out.println("Botão Perfil");
        Parent perfil_parent = FXMLLoader.load(getClass().getResource("/sample/view/login.fxml"));
        Scene perfil_scene = new Scene(perfil_parent);
        Stage perfil_stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        perfil_stage.setScene(perfil_scene);
        perfil_stage.show();

    }
}
