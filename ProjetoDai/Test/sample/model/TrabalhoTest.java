package sample.model;

import org.junit.jupiter.api.Test;
import sample.Main;
import sample.controller.BD_CONTROLLER;
import sample.controller.WORK_TB;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import static org.junit.jupiter.api.Assertions.*;

class TrabalhoTest {

    @Test
    void getVagasTrabalhos() {

        int i = 0;
        int soma = 0;

        while (i < BD_CONTROLLER.getWORKS().size()) {
            System.out.println("nº vagas do trabalho " + BD_CONTROLLER.getWORKS().get(i).type.getNome() + " é " + BD_CONTROLLER.getWORKS().get(i).type.getVagas()); //numero de vagas de determinado trabalho
            int x = BD_CONTROLLER.getWORKS().get(i).type.getVagas();
            soma += x; //soma todas as vagas
            i++;
        }
        System.out.println("Soma de todas as vagas disponiveis: " + soma);
        //assertEquals(5, x); //verifica se o valor espera de vagas coincide com o armazenado
    }

    @Test
    void getPrecoHora() {
        int i = 0;
        int soma = 0;

        while (i < BD_CONTROLLER.getWORKS().size()) {
            System.out.println("O valor do preço-hora do trabalho " + BD_CONTROLLER.getWORKS().get(i).type.getNome() + " é " + BD_CONTROLLER.getWORKS().get(i).type.getPrecoHora()); //valor do preco hora de determinado trabalho
            int x = BD_CONTROLLER.getWORKS().get(i).type.getPrecoHora();
            soma += x; //soma todos os valores de precoHora
            i++;
        }
        System.out.println("Soma de todos os preços-hora disponiveis: " + soma);
    }

    @Test
    void getNome() {
        int i = 0;

        while (i < BD_CONTROLLER.getWORKS().size()) {
            System.out.println("O nome do trabalho é: " + BD_CONTROLLER.getWORKS().get(i).type.getNome()); //Nome dos trabalhos
            i++;
        }
    }

    @Test
    void getIdTrabalho() {
        int i = 0;
        int soma = 0;

        while (i < BD_CONTROLLER.getWORKS().size()) {
            System.out.println("O id do trabalho " + BD_CONTROLLER.getWORKS().get(i).type.getNome() + " é " + BD_CONTROLLER.getWORKS().get(i).type.getIdTrabalho()); //id de cada trabalho
            i++;
        }
        System.out.println("Nº de trabalhos disponiveis: " + i); //total de trabalhos disponiveis
    }

    @Test
    void escolherTrabalho() {
        //FAZER DEPOIS, ASSOCIAR PRISIONEIRO A TRABALHO
    }

}
