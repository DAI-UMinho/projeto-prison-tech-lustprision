package sample.controller;

import java.util.*;

public class TRANSACTION {
    int Spended;
    Date ShopDate;

    public TRANSACTION(SHOPLIST x){
        this.Spended=x.Price;
        //set a shopdate para a data do sistema
    }

}
