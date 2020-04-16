package com.lustprision.admin.service;

import com.lustprision.admin.domain.PressProduct;
import com.lustprision.admin.domain.Product;
import com.lustprision.admin.repository.PressProductRepository;
import com.lustprision.admin.repository.ProductRepository;
import com.lustprision.admin.repository.PurchaseRepository;
import com.lustprision.admin.service.dto.PressProductDTO;
import com.lustprision.admin.service.dto.PressProductExtendedDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class PurchaseService {

    private final Logger log = LoggerFactory.getLogger(PrisionerService.class);

    private final PurchaseRepository purchaseRepository;

    private final PressProductRepository pressProductRepository;

    private final ProductRepository productRepository;

    public PurchaseService(PurchaseRepository purchaseRepository, PressProductRepository pressProductRepository,
                           ProductRepository productRepository){
        this.purchaseRepository = purchaseRepository;
        this.pressProductRepository = pressProductRepository;
        this.productRepository = productRepository;
    }

    public List<PressProductDTO> getPurchasePresProduct(Long id){
        List<PressProductDTO> productPresList = new ArrayList<>();
        purchaseRepository.findById(id).ifPresent(purchase -> {
            pressProductRepository.findAllByPurchase(purchase)
                .forEach(pressProduct -> {
                    productPresList.add(new PressProductDTO(pressProduct));
                });
        });
        return productPresList;
    }

    public List<PressProductExtendedDTO> getPurchaseProductListInfo(Long id){
        List<PressProductExtendedDTO> productInfoList = new ArrayList<>();
        purchaseRepository.findById(id).ifPresent(purchase -> {
            pressProductRepository.findAllByPurchase(purchase)
                .forEach(pressProduct -> {
                    PressProductExtendedDTO productInfo = new PressProductExtendedDTO(pressProduct);
                    productRepository.findById(productInfo.getProductID())
                        .ifPresent(product -> {
                            productInfo.setNameProd(product.getNameProd());
                            productInfo.setPrice(product.getPrice());
                        });
                    productInfoList.add(productInfo);
                });
        });
        return productInfoList;
    }
}
