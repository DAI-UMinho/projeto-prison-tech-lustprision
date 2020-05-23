package sample.controller;
import sample.model.Prisioneiro;
import sample.model.Produto;
import sample.model.Quiz;
import sample.model.Trabalho;

import javax.swing.*;
import java.sql.*;
import java.util.*;

public class BD_CONTROLLER {

    static String dburl = "jdbc:oracle:thin:@//193.136.11.147:1521/lustdb2";
    static String dbusername = "system";
    static String dbpassword = "DBpassword#1";




    public static ArrayList<PRODUCT_TB> getPRODUCTS() {
        ArrayList<PRODUCT_TB> output = new ArrayList();
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            System.out.println("Conexão com sucesso");
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("SELECT * FROM Product ");

            while (rs.next()) {
                //coisas que faltem ir buscar à bd adicionar ao construtor de produtos e ir buscar ao ResultSet
                Produto x = new Produto(rs.getInt(1), rs.getString(3), rs.getString(6), rs.getInt(4), rs.getInt(7));


                PRODUCT_TB y = new PRODUCT_TB(x);
                output.add(y);
            }
            con.close();

            return output;

        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
            System.out.println("Conexão sem sucesso");

            return null;
        }
    }

    public static ArrayList<WORK_TB> getWORKS() {
        ArrayList<WORK_TB> output = new ArrayList();

        try {

            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            System.out.println("Conexão com sucesso");
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("SELECT * FROM WORK_JOB");

            while (rs.next()) {
                Trabalho x = new Trabalho(rs.getInt(1),rs.getString(2),rs.getInt(3),rs.getInt(4));
                WORK_TB y= new WORK_TB(x);
                output.add(y);
            }
            con.close();
            System.out.println("Trabalhos sairam da BD");
            return output;

        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
            System.out.println("Conexão sem sucesso");

            return null;
        }
    }

    public static ArrayList<WORK_TB> getJobFilter() {

        ArrayList<WORK_TB> output = new ArrayList();

        try {

            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            System.out.println("Conexão com sucesso");
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("SELECT * FROM WORK_JOB where STATE_ID = 1");

            while (rs.next()) {
                Trabalho x = new Trabalho(rs.getInt(1),rs.getString(2),rs.getInt(3),rs.getInt(4));
                WORK_TB y= new WORK_TB(x);
                output.add(y);
            }
            con.close();
            System.out.println("Trabalhos  Filtrados sairam da BD");
            return output;

        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
            System.out.println("Conexão sem sucesso");

            return null;
        }
    }

    //ADICIONAMOS ESTA FUNCAO PARA OS TESTES
    public static ArrayList<Prisioneiro> getPrisioners() {

        ArrayList<Prisioneiro> output = new ArrayList();

        try {

            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            System.out.println("Conexão com sucesso");
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("SELECT * FROM PRISIONER");

            while (rs.next()) {

                Prisioneiro x = new Prisioneiro(rs.getInt(1), rs.getString(2), rs.getInt(4), rs.getDate(6),rs.getInt(7));



                output.add(x);
            }
            con.close();
            //System.out.println("Trabalhos sairam da BD");
            return output;

        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
            //System.out.println("Conexão sem sucesso");

            return null;
        }


    }

    public static String getIdwork (int ID){
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            System.out.println("Conexão com sucesso");
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("SELECT WORK_ID From PRESS_WORK where PRISIONER_ID = " +ID+ "AND STATE_ID = 1");
            rs.next();
            int d = rs.getInt("WORK_ID");
            System.out.println(d);
            ResultSet r = st.executeQuery("SELECT NAME_WORK From WORK_JOB where ID = " +d);
            r.next();
            String nometrabalho = r.getString("NAME_WORK");
            con.close();
            return nometrabalho;

        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
            System.out.println("Conexão sem sucesso");
            return "Não tem trabalho";
        }

    }

   //teste 12 12
    public static int getPrisionerPIN(int ID) {

        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            System.out.println("Conexão com sucesso");
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("SELECT ID,CODIGO_CARTAO FROM Prisioner ");

            while (rs.next()) {
                if (rs.getInt(1) == ID) {
                    return rs.getInt(2);
                }
            }
            con.close();


        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
            System.out.println("Conexão sem sucesso");


        }
        return 0;
    }

    public static Prisioneiro loadUser(int ID) {
        try {

            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            System.out.println("Conexão com sucesso");
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("SELECT * FROM Prisioner ");

            while (rs.next()) {
                if (rs.getInt(1) == ID) {
                    Prisioneiro user = new Prisioneiro(rs.getInt(1), rs.getString(2), rs.getInt(4), rs.getDate(6),rs.getInt(7));
                    System.out.println(rs.getInt(1)+ rs.getString(2)+ rs.getInt(4) + rs.getDate(6 ) + rs.getInt(7));
                    return user;
                }
            }
            con.close();


        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
            System.out.println("Conexão sem sucesso");


        }
        return null;
    }

    public static boolean removeProduct(int id, int qnty){ //quantidades negativas (if)

        try {

            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            System.out.println("Conexão com sucesso");
            Statement st = con.createStatement();
            String query = "UPDATE Product SET QUANTY_IN_STOCK = QUANTY_IN_STOCK - " + Integer.toString(qnty) +" WHERE ID = " + Integer.toString(id);
            ResultSet rs = st.executeQuery(query);
            con.close();
            return true;

        } catch (SQLException | ClassNotFoundException e) {

            System.out.println(e);
            System.out.println("Stock indisponivel");
            return false;

        }


    }

    public static int getProductStock(int id){
        try {

            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            System.out.println("Conexão com sucesso");
            Statement st = con.createStatement();
            String query = "SELECT ID,QUANTY_IN_STOCK FROM PRODUCT WHERE ID = '"+id+"'";
            ResultSet rs = st.executeQuery(query);
            con.close();
            return rs.getInt(2);

        } catch (SQLException | ClassNotFoundException e) {

            System.out.println(e);
            System.out.println("Stock indisponivel");
            return 0;

        }


    }

    public static boolean removeCredits(int id, int amount){  //creditos nao podem ser negativos (if)
        try {

            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            System.out.println("Conexão com sucesso");
            Statement st = con.createStatement();
            String query = "UPDATE Prisioner SET BALANCE = BALANCE - " + Integer.toString(amount) +" WHERE ID = " + Integer.toString(id);
            ResultSet rs = st.executeQuery(query);
            con.close();
            return true;

        } catch (SQLException | ClassNotFoundException e) {

            System.out.println(e);
            System.out.println("Stock indisponivel");
            return false;

        }


    }

    //return void pendente
    public static void applyjob(int id, int idjob){  //update vagas
        try {

            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            Statement st = con.createStatement();
            String query = "INSERT INTO PRESS_WORK (ID,PRISIONER_ID, WORK_ID, STATE_ID) VALUES ("+id+","+id+", "+idjob+", 1)";
            ResultSet rs = st.executeQuery(query);
            System.out.println("CANDIDATURA");
            JOptionPane.showMessageDialog(null, "Candidatura com sucesso.");
            con.close();


        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
            System.out.println("Candidatura errada");
            JOptionPane.showMessageDialog(null, "Erro na tentativa de candidatura.");
        }
    }

    public static String getProdutoNome(int id){
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            System.out.println("Conexão com sucesso");
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("SELECT NAME_PROD From PRODUCT where ID = " +id);
            rs.next();
            String d = rs.getString("NAME_PROD");
            System.out.println(d);
            con.close();
            return d;

        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
            System.out.println("Conexão sem sucesso");
            return "Não tem trabalho";
        }
    }

    public static int getProdutoPreco(int id){
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            System.out.println("Conexão com sucesso");
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("SELECT PRICE From PRODUCT where ID = " +id);
            rs.next();
            int d = rs.getInt("PRICE");
            System.out.println(d);
            con.close();
            return d;

        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
            System.out.println("Conexão sem sucesso");
            return 0;
        }
    }

    public static Quiz loadQuiz(int ID) {
        try {

            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            System.out.println("Conexão com sucesso");
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("SELECT * FROM QUESTION ");

            while (rs.next()) {
                if (rs.getInt(1) == ID) {
                    Prisioneiro user = new Prisioneiro(rs.getInt(1), rs.getString(2), rs.getInt(4), rs.getDate(6),rs.getInt(7));
                    System.out.println(rs.getInt(1)+ rs.getString(2)+ rs.getInt(4) + rs.getDate(6 ) + rs.getInt(7));
                    return user;
                }
            }
            con.close();


        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
            System.out.println("Conexão sem sucesso");


        }
        return null;
    }



}
