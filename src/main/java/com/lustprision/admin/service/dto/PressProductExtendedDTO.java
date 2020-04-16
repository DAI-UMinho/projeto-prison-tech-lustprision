package com.lustprision.admin.service.dto;
import com.lustprision.admin.domain.PressProduct;

public class PressProductExtendedDTO extends PressProductDTO {

    private String nameProd;

    private Long price;

    public PressProductExtendedDTO(){}

    public PressProductExtendedDTO(PressProduct pressProduct){
        setId(pressProduct.getId());
        setPriceTotal(pressProduct.getPriceTotal());
        setProductID(pressProduct.getProduct());
        setQty(pressProduct.getQty());
    }

    public String getNameProd(){ return nameProd; }

    public void setNameProd(String nameProd){ this.nameProd = nameProd; }

    public Long getPrice(){ return price; }

    public void setPrice(Long price){ this.price = price; }
}
