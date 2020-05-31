package com.lustprision.admin.service.dto;

import com.lustprision.admin.domain.Product;

import javax.persistence.Column;
import javax.persistence.Lob;

public class ProductDTO extends AuditDTO {

    private Long id;

    private String nameProd;

    private Long price;

    private String seler;

    private String descriptionProd;

    private Integer quantyInStock;

    public ProductDTO(){
        super(null, null, null, null);
    }

    public ProductDTO(Product product){
        super(product.getCreatedBy(), product.getCreatedDate(), product.getLastModifiedBy(), product.getLastModifiedDate());
        nameProd = product.getNameProd();
        price = product.getPrice();
        seler = product.getSeler();
        descriptionProd = product.getDescriptionProd();
        quantyInStock = product.getQuantyInStock();
    }
}
