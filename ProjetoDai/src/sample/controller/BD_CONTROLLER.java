package sample.controller;
import sample.model.*;

import javax.swing.*;
import java.sql.*;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.*;
import java.util.Date;


public class BD_CONTROLLER {


    static String dburl = "jdbc:oracle:thin:@//193.136.11.147:1521/lustdb2";
    static String dbusername = "system";
    static String dbpassword = "DBpassword#1";
    private static BD_CONTROLLER bd_controller;

    public BD_CONTROLLER(){}

    public static BD_CONTROLLER getBd_controller(){
        if(bd_controller == null){
            bd_controller = new BD_CONTROLLER();
        }
        return bd_controller;
    }

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
                Produto x = new Produto(rs.getInt("ID"), rs.getString("NAME_PROD"), rs.getString("DESCRIPTION_PROD"), rs.getInt("PRICE"), rs.getInt("QUANTY_IN_STOCK"));


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
                Trabalho x = new Trabalho(rs.getInt("ID"),rs.getString("NAME_WORK"),rs.getInt("TOTAL_CREDITS"),rs.getInt("NUM_REMAINING_ENTRIES"));
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
                Trabalho x = new Trabalho(rs.getInt("ID"),rs.getString("NAME_WORK"),rs.getInt("TOTAL_CREDITS"),rs.getInt("NUM_REMAINING_ENTRIES"));
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

                Prisioneiro x = new Prisioneiro(rs.getInt("ID"), rs.getString("NAME"), rs.getInt("NUM_PRISIONER"), rs.getDate("DATA_NASCIMENTO"),rs.getInt("BALANCE"));



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
                if (rs.getInt("ID") == ID) {
                    return rs.getInt("CODIGO_CARTAO");
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
                    Prisioneiro user = new Prisioneiro(rs.getInt("ID"), rs.getString("NAME"), rs.getInt("NUM_PRISIONER"), rs.getDate("DATA_NASCIMENTO"),rs.getInt("BALANCE"));

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

    public static int getProdutoID(int id){
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            System.out.println("Conexão com sucesso");
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("SELECT ID From PRODUCT where ID = " +id);
            rs.next();
            int d = rs.getInt("ID");
            System.out.println(d);
            con.close();
            return d;

        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
            System.out.println("Conexão sem sucesso");
            return 0;
        }
    }

    public static int getProdutoQuantidade(int id){
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            System.out.println("Conexão com sucesso");
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("SELECT QUANTY_IN_STOCK From PRODUCT where ID = " +id);
            rs.next();
            int d = rs.getInt("QUANTY_IN_STOCK");
            System.out.println(d);
            con.close();
            return d;

        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
            System.out.println("Conexão sem sucesso");
            return 0;
        }
    }

    public static String getProdutoDescricao(int id){
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            System.out.println("Conexão com sucesso");
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("SELECT DESCRIPTION_PROD From PRODUCT where ID = " +id);
            rs.next();
            String d = rs.getString("DESCRIPTION_PROD");
            System.out.println(d);
            con.close();
            return d;

        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
            System.out.println("Conexão sem sucesso");
            return "";
        }
    }

    public static void addPurchase(int id){
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            Statement st = con.createStatement();
            String query1 = "SELECT SEQUENCE_GENERATOR.nextval FROM dual";
            ResultSet rs1 = st.executeQuery(query1);
            rs1.next();
            int d = rs1.getInt("NEXTVAL");
            //System.out.println(d);

            String query = "INSERT INTO PURCHASE (ID,PRISIONER_ID,PURCHASE_DATE,PURCHASE_TOTAL) VALUES ("+d+","+id+", '2020-05-29', 0)"; //DATA ATENÇão MUDAR
            ResultSet rs = st.executeQuery(query);
            rs.next();
            System.out.println("PURCHASE");
            //JOptionPane.showMessageDialog(null, "PURCHASE com sucesso.");
            con.close();
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
            System.out.println(e);
            System.out.println("PURCHASE errada");
            //JOptionPane.showMessageDialog(null, "Erro na tentativa de candidatura.");
        }
    }

    /* public static void addPressProdut(int id){
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            Statement st = con.createStatement();
            String query1 = "SELECT SEQUENCE_GENERATOR.nextval FROM dual";
            ResultSet rs1 = st.executeQuery(query1);
            rs1.next();
            int d = rs1.getInt("NEXTVAL");
            String query = "INSERT INTO PRESS_WORK (ID, QTY ,PRICE_TOTAL, PPRICE_TOTAL, PURCHASE_ID, PRODUCT_ID) VALUES ("+d+","+id+", "++", 0)";
            ResultSet rs = st.executeQuery(query);
            rs.next();
            System.out.println("PRESS PRODUCT");
            JOptionPane.showMessageDialog(null, "PRESS PRODUCT com sucesso.");
            con.close();
        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e);
            System.out.println("PRESS errada");
            JOptionPane.showMessageDialog(null, "Erro na tentativa de candidatura.");
        }
    }*/

    /*public static Quiz loadQuiz(int ID) {
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
    }*/



    public static Quiz getQuiz(int id){ // este id é do prisioneiro , não do quiz o do quiz está como idquiz
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(dburl, dbusername, dbpassword);
            System.out.println("Conexão com sucesso");
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("SELECT QUIZ_ID FROM PRIS_QUIZ WHERE PRISIONER_ID = "+id+"AND APPROVAL = 1");
            rs.next();
            int idquiz = rs.getInt("QUIZ_ID");

            Statement st2 = con.createStatement();
            ResultSet rs2 = st2.executeQuery("SELECT QUESTION_ID FROM QUESTION_QUIZ WHERE QUIZ_ID ="+idquiz);

            int questionids[] = new int[5];
            rs2.next();
            for(int i =0 ; i<5;i++){
                questionids[i]=rs2.getInt("QUESTION_ID");
                rs2.next();
            }

            Statement st3 = con.createStatement();

            ArrayList<Questoes> questions = new ArrayList<>();

            for(int i = 0 ; i<5;i++){
            ResultSet rs3 = st3.executeQuery("SELECT * FROM QUESTION WHERE ID = "+questionids[i]);
            rs3.next();
            ArrayList<String> answers = new ArrayList<>();
            answers.add(rs3.getString("WONG_ANSWER_1"));
            answers.add(rs3.getString("WONG_ANSWER_2"));
            answers.add(rs3.getString("WONG_ANSWER_3"));

            Questoes x = new Questoes(rs3.getInt("ID"),rs3.getString("QUESTION"),answers,rs3.getInt("JHI_VALUE"),rs3.getString("ANSWER"));
            questions.add(x);
            }

            Quiz quiz = new Quiz(idquiz,5,questions);
            return quiz;


        }catch(SQLException | ClassNotFoundException e){
            System.out.print("Não há QUIZ");
            return null;
        }


    }









}
