package sample.model;

import org.junit.jupiter.api.Test;
import sample.controller.BD_CONTROLLER;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

class PrisioneiroTest {

    int numeroUtilizadores = BD_CONTROLLER.getPrisioners().size(); //Número de utilizadores registados no sistema

    @Test
    void isPermissaoQuiz() {
        int i = 0;
        while(i<numeroUtilizadores) {
            int j = BD_CONTROLLER.getPrisioners().get(i).getID(); //id do utilizador
            System.out.println("Permissão do Utilizador: " + BD_CONTROLLER.loadUser(j).isPermissaoQuiz()); //print da permissao do user
            i++;
        }
    }

    @Test
    void getSaldo() {
        int i = 0;
        while(i<numeroUtilizadores) {
            int j = BD_CONTROLLER.getPrisioners().get(i).getID(); //id do utilizador
            System.out.println("Saldo do utilizador: " + BD_CONTROLLER.loadUser(j).getSaldo()); //print da saldo do user
            i++;
        }
    }

    @Test
    void getNome() {
        int i = 0;
        while(i<numeroUtilizadores) {
            int j = BD_CONTROLLER.getPrisioners().get(i).getID(); //id do utilizador
            System.out.println("Nome do utilizador: " + BD_CONTROLLER.loadUser(j).getNome()); //print da nome do user
            i++;
        }
    }

    @Test
    void getID() {
        int i = 0;
        while(i<numeroUtilizadores) {
            int j = BD_CONTROLLER.getPrisioners().get(i).getID(); //id do utilizador
            System.out.println("Id do utilizador: " + BD_CONTROLLER.loadUser(j).getID()); //print da ID do user
            i++;
        }
    }

    @Test
    void getNumRecluso() {
        int i = 0;
        while(i<numeroUtilizadores) {
            int j = BD_CONTROLLER.getPrisioners().get(i).getID(); //id do utilizador
            System.out.println("Numero de recluso: " + BD_CONTROLLER.loadUser(j).getNumRecluso()); //print da num do recluso
            i++;
        }
    }

    @Test
    void getDataNascim() {
        int i = 0;
        while(i<numeroUtilizadores) {
            int j = BD_CONTROLLER.getPrisioners().get(i).getID(); //id do utilizador
            System.out.println("Data de Nascimento: " + BD_CONTROLLER.loadUser(j).getDataNascim()); //print da data de nascimento do recluso
            i++;
        }
    }
}
