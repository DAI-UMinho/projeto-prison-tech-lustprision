package com.lustprision.admin.service.dto;

import com.lustprision.admin.domain.PressProduct;
import com.lustprision.admin.domain.Product;
import com.lustprision.admin.domain.Purchase;

public class PressProductDTO {

    private Long id;

    private Integer qty;

    private Long priceTotal;

    private Long productID;

    public PressProductDTO(){}

    public PressProductDTO(PressProduct pressProduct){
        this.id = pressProduct.getId();
        this.qty = pressProduct.getQty();
        this.priceTotal = pressProduct.getPriceTotal();
        this.productID = pressProduct.getProduct().getId();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQty() { return qty; }

    public void setQty(Integer qty) {
        this.qty = qty;
    }

    public Long getPriceTotal() {
        return priceTotal;
    }

    public void setPriceTotal(Long priceTotal){ this.priceTotal = priceTotal; }

    public Long getProductID(){ return productID; }

    public void setProductID(Product product){
        this.productID = product.getId();
    }
}
