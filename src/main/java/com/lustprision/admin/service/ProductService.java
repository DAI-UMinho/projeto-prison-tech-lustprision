package com.lustprision.admin.service;

import com.lustprision.admin.domain.Product;
import com.lustprision.admin.repository.PressProductRepository;
import com.lustprision.admin.repository.PrisionerRepository;
import com.lustprision.admin.repository.ProductRepository;
import com.lustprision.admin.repository.PurchaseRepository;
import com.lustprision.admin.service.dto.PressProductDTO;
import com.lustprision.admin.service.dto.PressProductExtendedDTO;
import com.lustprision.admin.service.dto.ProductSaleDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductService {

    private final Logger log = LoggerFactory.getLogger(PrisionerService.class);

    private final PrisionerRepository prisionerRepository;

    private final PurchaseRepository purchaseRepository;

    private final PressProductRepository pressProductRepository;

    private final ProductRepository productRepository;

    public ProductService(PressProductRepository pressProductRepository, ProductRepository productRepository,
                            PrisionerRepository prisionerRepository, PurchaseRepository purchaseRepository){
        this.pressProductRepository = pressProductRepository;
        this.productRepository = productRepository;
        this.prisionerRepository = prisionerRepository;
        this.purchaseRepository = purchaseRepository;
    }

    public List<ProductSaleDTO> getPressProductFromProduct(Long id){
        Product product = productRepository.findById(id).get();
        List<ProductSaleDTO> sales = pressProductRepository.findAllByProduct(product)
            .stream()
            .map(ProductSaleDTO::new)
            .collect(Collectors.toList());

        sales.forEach(productSaleDTO ->
                purchaseRepository.findById(productSaleDTO.getPurchaseID()).ifPresent(purchase -> {
                    productSaleDTO.setPrisonerName(purchase.getPrisioner().getName());
                    productSaleDTO.setPrisonerImage(purchase.getPrisioner().getProfileImage());
                    productSaleDTO.setPrisonerImageContentType(purchase.getPrisioner().getProfileImageContentType());
                    })
            );
        return sales;
    }
}
