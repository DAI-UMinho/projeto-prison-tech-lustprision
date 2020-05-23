package sample.view.controllerView;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import sample.Main;
import sample.controller.BD_CONTROLLER;
import sample.model.Produto;
import javax.swing.*;
import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;


public class ShopController implements Initializable {
    public VBox productvbox;
    public Label saldo;

    public TableView tableview;

    static ObservableList<Produto> observableList = FXCollections.observableArrayList();

    public Label totaltxt;




    public static int total = 0;

    public static void handleBtnAdicionar(int d) {



        String nome = BD_CONTROLLER.getProdutoNome(d);
        int preco = BD_CONTROLLER.getProdutoPreco(d);


        observableList.add(new Produto(nome, preco));

        int tamanho = observableList.size();

        int i = tamanho-1;

        System.out.println("PRECO:" + observableList.get(i).getPreco());

        total = total + observableList.get(i).getPreco();

        System.out.println("TOTAL" + total);

        String s=String.valueOf(total);
        System.out.println("TOTAL STRING" + s);



    }

    @Override
    public void initialize(URL url, ResourceBundle rb) {

        TableColumn<String, Produto> column1 = new TableColumn<>("Produto");
        column1.setCellValueFactory(new PropertyValueFactory<>("Nome"));

        TableColumn<Integer, Produto> column2 = new TableColumn<>("Preço");
        column2.setCellValueFactory(new PropertyValueFactory<>("Preco"));

        tableview.getColumns().addAll(column1, column2);

        tableview.setItems(observableList);



        saldo.setText(Main.sis.sessionatual.nowusing.getSaldo());
        int sz = Main.sis.products.size();
        System.out.println(sz);
        Node[] nodes = new Node[sz];

        for(int i = 0 ; i< sz; i++){
            try{
                ProductLineController.name=Main.sis.products.get(i).type.getNome();
                ProductLineController.price=Main.sis.products.get(i).type.getPreco();
                ProductLineController.id=Main.sis.products.get(i).type.getID();

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

    public void deleteBtn(ActionEvent actionEvent) {
        Produto p = (Produto) tableview.getSelectionModel().getSelectedItem();
        tableview.getItems().removeAll(tableview.getSelectionModel().getSelectedItem());

        /*int tamanho = observableList.size();
        int i = 0;
        total -= p.getPreco();
        //totaltxt.setText(String.valueOf(total));*/
    }
}
