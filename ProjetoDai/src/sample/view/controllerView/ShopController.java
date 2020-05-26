package sample.view.controllerView;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
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
import sample.controller.PRODUCT_TB;
import sample.model.Produto;
import javax.swing.*;
import javax.swing.plaf.basic.BasicInternalFrameTitlePane;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.ResourceBundle;


public class ShopController implements Initializable {


    public static boolean isshopping=false; // quando paga isshoping false

    public VBox productvbox;
    public Label saldo;


    public Label totallbl;


    public TableView tableshoplist;

    ObservableList<PRODUCTLISTLINE> obsshoplistfront = FXCollections.observableArrayList();

    @Override
    public void initialize(URL url, ResourceBundle rb) {





        if(isshopping==true){

            obsshoplistfront.clear();
            tableshoplist.getItems().clear();
            tableshoplist.getColumns().clear();

            totallbl.setText(Integer.toString(Main.sis.sessionatual.shoplist.getPrice()));

            ArrayList<PRODUCT_TB> shoplistfront= Main.sis.sessionatual.displayShoplist(); // arraylist

            int size = shoplistfront.size();

            for(int i = 0 ; i<size ;i++) {
                PRODUCTLISTLINE x = new PRODUCTLISTLINE(shoplistfront.get(i).type.getPreco(), shoplistfront.get(i).type.getNome(), shoplistfront.get(i).quantity);
                obsshoplistfront.add(x);
                System.out.println("criou");
            }

            TableColumn<Integer, PRODUCTLISTLINE> column1 = new TableColumn<>("Produto");
            column1.setCellValueFactory(new PropertyValueFactory<>("price"));

            TableColumn<String, PRODUCTLISTLINE> column2 = new TableColumn<>("Nome");
            column2.setCellValueFactory(new PropertyValueFactory<>("Nome"));

            TableColumn<Integer, PRODUCTLISTLINE> column3 = new TableColumn<>("Qnt");
            column3.setCellValueFactory(new PropertyValueFactory<>("qnt"));

            tableshoplist.getColumns().addAll(column1,column2,column3);

            tableshoplist.setItems(obsshoplistfront);



        }

        saldo.setText( Integer.toString(Main.sis.sessionatual.nowusing.getSaldo()));

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
        //System.out.println("Botão Loja");
        Parent loja_parent = FXMLLoader.load(getClass().getResource("/sample/view/shop.fxml"));
        Scene loja_scene = new Scene(loja_parent);
        Stage loja_stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        loja_stage.setScene(loja_scene);
        loja_stage.show();
    }

    public void handleBtnTrabalho(ActionEvent actionEvent) throws IOException {
        //System.out.println("Botão Trabalho");
        Parent trabalho_parent = FXMLLoader.load(getClass().getResource("/sample/view/work.fxml"));
        Scene trabalho_scene = new Scene(trabalho_parent);
        Stage trabalho_stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        trabalho_stage.setScene(trabalho_scene);
        trabalho_stage.show();
    }

    public void handleBtnQuiz(ActionEvent actionEvent) throws IOException {
        //System.out.println("Botão Quiz");
        Parent quiz_parent = FXMLLoader.load(getClass().getResource("/sample/view/quiz.fxml"));
        Scene quiz_scene = new Scene(quiz_parent);
        Stage quiz_stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        quiz_stage.setScene(quiz_scene);
        quiz_stage.show();
    }

    public void handleBtnPerfil(ActionEvent actionEvent) throws IOException {
        //System.out.println("Botão Perfil");
        Parent perfil_parent = FXMLLoader.load(getClass().getResource("/sample/view/profile.fxml"));
        Scene perfil_scene = new Scene(perfil_parent);
        Stage perfil_stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        perfil_stage.setScene(perfil_scene);
        perfil_stage.show();
    }

    public void handleBtnSair(ActionEvent actionEvent) throws IOException {
        //System.out.println("Botão Perfil");
        Parent perfil_parent = FXMLLoader.load(getClass().getResource("/sample/view/login.fxml"));
        Scene perfil_scene = new Scene(perfil_parent);
        Stage perfil_stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        perfil_stage.setScene(perfil_scene);
        perfil_stage.show();

    }

    public void deleteBtn(ActionEvent actionEvent) throws IOException {
        if(tableshoplist.getSelectionModel().getSelectedItem()!=null){}else return;

        PRODUCTLISTLINE x = (PRODUCTLISTLINE) tableshoplist.getSelectionModel().getSelectedItem();
        Main.sis.sessionatual.removeShopping(Main.sis.getProductFSNAME(x.Nome));

        ShopController.isshopping=true;

        Parent loja_parent = FXMLLoader.load(getClass().getResource("/sample/view/shop.fxml"));
        Scene loja_scene = new Scene(loja_parent);
        Stage loja_stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        loja_stage.setScene(loja_scene);
        loja_stage.show();

    }

    public void handleBtnPagar(ActionEvent actionEvent) throws IOException {

        String end_statement = Main.sis.sessionatual.finishShopping();

        if(end_statement.equals("finished")){

            ShopController.isshopping=false;

            Parent loja_parent = FXMLLoader.load(getClass().getResource("/sample/view/shop.fxml"));
            Scene loja_scene = new Scene(loja_parent);
            Stage loja_stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
            loja_stage.setScene(loja_scene);
            loja_stage.show();
            return;
        }

        if(end_statement.equals("NO_SALDO")){



        }else{



        }




    }


}
