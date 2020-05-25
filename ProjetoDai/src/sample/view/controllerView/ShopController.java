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
import sample.model.Produto;
import javax.swing.*;
import javax.swing.plaf.basic.BasicInternalFrameTitlePane;
import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;


public class ShopController implements Initializable {
    public VBox productvbox;
    public Label saldo;
    public TableView tableview;

    @FXML
    public Label totaltxt;

    public static int total = 0;
    public static int quantidade = 0;

    public ShopController(){
    }

    static ObservableList<Produto> observableList = FXCollections.observableArrayList();


    public void BtnAdicionar(int d) { //tava a static
        int qty = 0;
        qty++;
        int contador = 0;

        String nome = BD_CONTROLLER.getProdutoNome(d);
        int preco = BD_CONTROLLER.getProdutoPreco(d);
        String descricao = BD_CONTROLLER.getProdutoDescricao(d);
        int quantidade = BD_CONTROLLER.getProdutoQuantidade(d);
        int id = BD_CONTROLLER.getProdutoID(d);

        quantidade = qty;
        int tamanho = observableList.size();

        for(int i = 0; i < tamanho; i++){
            if (id == observableList.get(i).getID()){
                observableList.get(i).setStock(observableList.get(i).getStock()+1);
                //Produto n = observableList.get(i);
                //observableList.remove(1);
                //observableList.add(i,n);
                observableList.set(i, observableList.get(i));
                contador++; }

            total += observableList.get(i).getPreco();
        }
        if (contador != 1){ observableList.add(new Produto(id, nome, descricao, preco,quantidade)); }

        //int i = tamanho-1;


        /*System.out.println("TOTAL" + total);
        String s=String.valueOf(total);
        System.out.println("TOTAL STRING" + s);
        totaltxt.setText(String.valueOf(total));
        totaltxt.setText("fsdgnsoihg");*/
    }

    @Override
    public void initialize(URL url, ResourceBundle rb) {

        TableColumn<String, Produto> column1 = new TableColumn<>("Produto");
        column1.setCellValueFactory(new PropertyValueFactory<>("Nome"));

        TableColumn<Integer, Produto> column2 = new TableColumn<>("Preço");
        column2.setCellValueFactory(new PropertyValueFactory<>("Preco"));

        TableColumn<Integer, Produto> column3 = new TableColumn<>("Quantidade");
        column3.setCellValueFactory(new PropertyValueFactory<>("Stock"));

        tableview.getColumns().addAll(column1, column2, column3);

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

    public void deleteBtn(ActionEvent actionEvent) {
        /*Produto p = (Produto) tableview.getSelectionModel().getSelectedItem();
        tableview.getItems().removeAll(tableview.getSelectionModel().getSelectedItem());
        int tamanho = observableList.size();
        int i = 0;
        total -= p.getPreco();
        totaltxt.setText(String.valueOf(total));*/

        int quant = ((Produto) tableview.getSelectionModel().getSelectedItem()).getStock();
        int valor = 0;

        if (quant != 1){
            Produto p = (Produto) tableview.getSelectionModel().getSelectedItem();
            ((Produto) tableview.getSelectionModel().getSelectedItem()).setStock(quant-1);
            valor = ((Produto) tableview.getSelectionModel().getSelectedItem()).getPreco();
        }
        else{
            Produto p = (Produto) tableview.getSelectionModel().getSelectedItem();
            tableview.getItems().removeAll(tableview.getSelectionModel().getSelectedItem());
            valor = ((Produto) tableview.getSelectionModel().getSelectedItem()).getPreco();
        }

        int tamanho = observableList.size();
        int i = 0;

        total -= valor;
        totaltxt.setText(String.valueOf(total));

        //tableview.refresh();
    }

    public void handleBtnPagar(ActionEvent actionEvent) {
        String s = totaltxt.getText();
        int foo = Integer.parseInt(s);

        System.out.println("STRIGN"+ s);
        System.out.println("Int" + foo);

        BD_CONTROLLER.removeCredits(Main.sis.sessionatual.nowusing.getID(), foo);
        int purchaseid = BD_CONTROLLER.addPurchase(Main.sis.sessionatual.nowusing.getID());
        int tamanho = observableList.size();

        for (int i = 0; i< tamanho; i++){
            System.out.println("fds");

            System.out.println(purchaseid);
            System.out.println(observableList.get(i).getStock());
            System.out.println(observableList.get(i).getID());

            BD_CONTROLLER.addPressProdut(purchaseid,observableList.get(i).getStock(), observableList.get(i).getID());

            BD_CONTROLLER.removeProduct(observableList.get(i).getID() ,observableList.get(i).getStock());

        }

        String sd = Main.sis.sessionatual.nowusing.getSaldo();
        int it = Integer.parseInt(sd);

        if(it >= foo){
            int conta = it - foo;
            saldo.setText(String.valueOf(conta));

            JOptionPane.showMessageDialog(null, "Pagamento com sucesso.");
        }
        else{ JOptionPane.showMessageDialog(null, "Saldo insuficiente."); }

        totaltxt.setText(String.valueOf(00));

    }

}
