package sample.model;

import org.junit.jupiter.api.Test;
import sample.controller.BD_CONTROLLER;

import java.sql.*;

import static org.junit.jupiter.api.Assertions.*;

class ProdutoTest {

    static String dburl = "jdbc:oracle:thin:@//193.136.11.147:1521/lustdb2";
    static String dbusername = "system";
    static String dbpassword = "DBpassword#1";

    int numeroProdutos = BD_CONTROLLER.getPRODUCTS().size();

    @Test
    void getStock() {
        int i = 0;
        while(i<numeroProdutos) {
            int j = BD_CONTROLLER.getPRODUCTS().get(i).type.getStock();
            System.out.println("Stock do produto: " + j);
            i++;
        }
    }

    @Test
    void getPreco() {
        int i = 0;
        while(i<numeroProdutos) {
            int j = BD_CONTROLLER.getPRODUCTS().get(i).type.getPreco();
            System.out.println("Preço do produto: " + j);
            i++;
        }
    }

    @Test
    void getDescricao() {
        int i = 0;
        while(i<numeroProdutos) {
            String j = BD_CONTROLLER.getPRODUCTS().get(i).type.getDescricao();
            System.out.println("Descricao do produto: " + j);
            i++;
        }
    }

    @Test
    void getNome() {
        int i = 0;
        while(i<numeroProdutos) {
            String j = BD_CONTROLLER.getPRODUCTS().get(i).type.getNome();
            System.out.println("Nome do produto: " + j);
            i++;
        }
    }

    @Test
    void getID() {
        int i = 0;
        while(i<numeroProdutos) {
            int j = BD_CONTROLLER.getPRODUCTS().get(i).type.getID();
            System.out.println("Id do produto: " + j);
            i++;
        }
    }

    @Test
    void removeProducts() { //rever teste
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            Statement st = con.createStatement();
            String query1 = "Select ID, QUANTY_IN_STOCK FROM PRODUCT WHERE ID=30351";
            ResultSet rs = st.executeQuery(query1);
            rs.next();
            System.out.println(rs.getInt("ID"));
            int idProduct = rs.getInt("ID");
            int qtdBefore = rs.getInt("QUANTY_IN_STOCK");

            System.out.println("Quantidade antes: " + qtdBefore);

            BD_CONTROLLER.removeProduct(idProduct, 93);

            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection conection = DriverManager.getConnection(dburl, dbusername, dbpassword);
            Statement statement = conection.createStatement();
            String query2 = "Select QUANTY_IN_STOCK FROM PRODUCT WHERE ID =" + idProduct;
            ResultSet result = statement.executeQuery(query2);
            result.next();

            int qtdAfter = result.getInt("QUANTY_IN_STOCK");
            System.out.print("Quantidade depois: " + qtdAfter);

            con.close();
        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
            System.out.println("Conexão sem sucesso");
        }
    }
    @Test
    void getProductStock() throws ClassNotFoundException { //rever
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            Statement st = con.createStatement();
            String query1 = "Select ID FROM PRODUCT WHERE ROWNUM <= 1";
            ResultSet rs = st.executeQuery(query1);
            rs.next();
            int pri = rs.getInt("ID");
            int cod =BD_CONTROLLER.getProductStock(pri);
            System.out.println(cod);
        }
        catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
            System.out.println("Conexão sem sucesso");
        }
    }
}
