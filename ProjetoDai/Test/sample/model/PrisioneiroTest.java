package sample.model;


import org.junit.jupiter.api.Test;
import sample.controller.BD_CONTROLLER;
import sample.controller.WORK_TB;

import java.sql.*;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

class PrisioneiroTest {
    static String dburl = "jdbc:oracle:thin:@//193.136.11.147:1521/lustdb2";
    static String dbusername = "system";
    static String dbpassword = "DBpassword#1";


    int numeroUtilizadores = BD_CONTROLLER.getPrisioners().size(); //Número de utilizadores registados no sistema

    @Test
    void isPermissaoQuiz() {
        int i = 0;
        while (i < numeroUtilizadores) {
            int j = BD_CONTROLLER.getPrisioners().get(i).getID(); //id do utilizador
            System.out.println("Permissão do Utilizador: " + BD_CONTROLLER.loadUser(j).isPermissaoQuiz()); //print da permissao do user
            i++;
        }
    }

    @Test
    void getSaldo() {
        int i = 0;
        while (i < numeroUtilizadores) {
            int j = BD_CONTROLLER.getPrisioners().get(i).getID(); //id do utilizador
            System.out.println("Saldo do utilizador: " + BD_CONTROLLER.loadUser(j).getSaldo()); //print da saldo do user
            i++;
        }
    }

    @Test
    void getNome() {
        int i = 0;
        while (i < numeroUtilizadores) {
            int j = BD_CONTROLLER.getPrisioners().get(i).getID(); //id do utilizador
            System.out.println("Nome do utilizador: " + BD_CONTROLLER.loadUser(j).getNome()); //print da nome do user
            i++;
        }
    }

    @Test
    void getID() {
        int i = 0;
        while (i < numeroUtilizadores) {
            int j = BD_CONTROLLER.getPrisioners().get(i).getID(); //id do utilizador
            System.out.println("Id do utilizador: " + BD_CONTROLLER.loadUser(j).getID()); //print da ID do user
            i++;
        }
    }

    @Test
    void getNumRecluso() {
        int i = 0;
        while (i < numeroUtilizadores) {
            int j = BD_CONTROLLER.getPrisioners().get(i).getID(); //id do utilizador
            System.out.println("Numero de recluso: " + BD_CONTROLLER.loadUser(j).getNumRecluso()); //print da num do recluso
            i++;
        }
    }

    @Test
    void getDataNascim() {
        int i = 0;
        while (i < numeroUtilizadores) {
            int j = BD_CONTROLLER.getPrisioners().get(i).getID(); //id do utilizador
            System.out.println("Data de Nascimento: " + BD_CONTROLLER.loadUser(j).getDataNascim()); //print da data de nascimento do recluso
            i++;
        }
    }

    @Test
    void removeCredits() throws ClassNotFoundException { //rever
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            Statement st = con.createStatement();
            String query1 = "Select ID, BALANCE FROM PRISIONER WHERE ROWNUM <= 1";
            ResultSet rs = st.executeQuery(query1);
            rs.next();
            System.out.println(rs.getInt("ID"));
            int idUser = rs.getInt("ID");
            int balanceBefore = rs.getInt("BALANCE");

            System.out.println(balanceBefore);

            BD_CONTROLLER.removeCredits(idUser, 5);

            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection conection = DriverManager.getConnection(dburl, dbusername, dbpassword);
            Statement statement = conection.createStatement();
            String query2 = "Select BALANCE FROM PRISIONER WHERE ID =" + idUser;
            ResultSet result = statement.executeQuery(query2);
            result.next();

            int balanceAfter = result.getInt("BALANCE");
            System.out.print(balanceAfter);

            con.close();
        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
            System.out.println("Conexão sem sucesso");
        }

    }

    @Test
    void getPrisionerPIN() throws ClassNotFoundException { //rever
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            Statement st = con.createStatement();
            String query1 = "Select ID FROM PRISIONER WHERE ROWNUM <= 1";
            ResultSet rs = st.executeQuery(query1);
            rs.next();
            int pri = rs.getInt("ID");
            int cod = BD_CONTROLLER.getPrisionerPIN(pri);
            System.out.println(+cod);
        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
            System.out.println("Conexão sem sucesso");
        }
    }

    @Test
    void addPurchase() throws ClassNotFoundException {
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            Statement st = con.createStatement();
            String query1 = "Select ID FROM PRISIONER WHERE ROWNUM <= 1";
            ResultSet rs = st.executeQuery(query1);
            rs.next();
            int pri = rs.getInt("ID");
            String query2 = "Select * FROM PURCHASE ";
            ResultSet result = st.executeQuery(query2);
            int cont = 0;
            while (result.next()) {
                cont++;
            }
            System.out.println(cont);

            BD_CONTROLLER.addPurchase(pri);
            String query3 = "Select * FROM PURCHASE ";
            ResultSet resu = st.executeQuery(query2);
            int conta = 0;
            while (resu.next()) {
                conta++;
            }
            System.out.println(conta);

        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
            System.out.println("Conexão sem sucesso");
        }
    }
    @Test
    void addPressProduct() throws ClassNotFoundException {
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            Statement st = con.createStatement();
            String query1 = "Select ID FROM PRISIONER WHERE ROWNUM <= 1";
            ResultSet rs = st.executeQuery(query1);
            rs.next();

            int pri = rs.getInt("ID");
            String query2 = "Select ID,QUANTY_IN_STOCK FROM PRODUCT WHERE ROWNUM <= 1";
            ResultSet res = st.executeQuery(query2);
            res.next();
            int produto = res.getInt("ID");
            int quant= res.getInt("QUANTY_IN_STOCK");
            System.out.println("Quantidade:"+quant);
           int aaa= BD_CONTROLLER.addPurchase(pri);


           BD_CONTROLLER.addPressProdut(aaa,1,produto);
           String query5 = "Select QUANTY_IN_STOCK FROM PRODUCT WHERE ID= " + produto;
            ResultSet r = st.executeQuery(query5);
            r.next();
            int quanti= r.getInt("QUANTY_IN_STOCK");
            System.out.println("Quantidade:"+quanti);
            con.close();
        } catch (SQLException | ClassNotFoundException e) {
        System.out.println(e);
        System.out.println("Conexão sem sucesso");
    }
    }
    @Test
    void addCredits() throws ClassNotFoundException {
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            Statement st = con.createStatement();
            String query1 = "Select ID,BALANCE FROM PRISIONER WHERE ROWNUM <= 1";
            ResultSet rs = st.executeQuery(query1);
            rs.next();
            int pri = rs.getInt("ID");
            int ba = rs.getInt("BALANCE");
            System.out.println(ba);
            BD_CONTROLLER.addCredits(pri,100000);
            String query2 = "Select BALANCE FROM PRISIONER WHERE ROWNUM <= 1";
            ResultSet res = st.executeQuery(query2);
            res.next();
            int bar = res.getInt("BALANCE");
            System.out.println(bar);

            System.out.println();
        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
            System.out.println("Conexão sem sucesso");
        }
}}
