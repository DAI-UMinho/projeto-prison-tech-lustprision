package sample.controller;
import sample.Main;

import java.util.*;
public class SHOPLIST {


    public ArrayList<PRODUCT_TB> Shoplist = new ArrayList<>();
    int Price=0;


    public SHOPLIST(){}

    public void addSHOPLIST(PRODUCT_TB product){

        for(int i = 0 ; i<Shoplist.size() ; i++){
            if(Shoplist.get(i).type.getID() == product.type.getID()){
                Shoplist.get(i).quantity++;
                Price+= product.type.getPreco();
                return;
            }
        }
        Shoplist.add(product);
        Price += product.type.getPreco();
    }

    public void removeSHOPLIST(PRODUCT_TB product){

        for(int i = 0 ; i<Shoplist.size() ; i++){

            if(Shoplist.get(i).type.getID() == product.type.getID()){

                if(Shoplist.get(i).quantity>1){
                Shoplist.get(i).quantity--;
                Price-= product.type.getPreco();
                return;
            }

                if(Shoplist.get(i).quantity==1){
                Shoplist.remove(i);
                Price-= product.type.getPreco();
                return;
            }
        }
        }

    }

    public int getPrice(){return Price;}

    public void resetSHOPLIST() {
        Shoplist.clear();
        Price=0;
        //bd controller e assim
    }






}
