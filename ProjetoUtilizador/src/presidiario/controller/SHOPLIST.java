package UTILITARY;

import java.util.ArrayList;

import UTILITARY.PRODUCT_TB;

public class SHOPLIST {
    ArrayList<PRODUCT_TB> Shoplist = new ArrayList<>();
    int Price=0;


    public SHOPLIST(){}

    public void addSHOPLIST(PRODUCT_TB product){
        Shoplist.add(product);
        Price += product.type.Preco;
    }

    public void removeSHOPLIST(PRODUCT_TB product){
        //correr a lista e tirar 1 objeto daquele tipo
    }

    public void resetSHOPLIST() {
        Shoplist.clear();
    }



}
