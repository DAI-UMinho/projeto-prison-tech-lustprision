package com.lustprision.admin.service;

import com.lustprision.admin.domain.PressWork;
import com.lustprision.admin.domain.Purchase;
import com.lustprision.admin.domain.Work;
import com.lustprision.admin.repository.PressWorkRepository;
import com.lustprision.admin.repository.PrisionerRepository;
import com.lustprision.admin.repository.PurchaseRepository;
import com.lustprision.admin.repository.WorkRepository;
import com.lustprision.admin.service.dto.PurchaseDTO;
import com.lustprision.admin.service.dto.UserDTO;
import com.lustprision.admin.service.dto.WorkDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class PrisionerService {

    private final Logger log = LoggerFactory.getLogger(PrisionerService.class);

    private final PrisionerRepository prisionerRepository;

    private final PurchaseRepository purchaseRepository;

    private final PressWorkRepository pressWorkRepository;

    public PrisionerService(PrisionerRepository prisionerRepository, PurchaseRepository purchaseRepository,
                            PressWorkRepository pressWorkRepository) {
        this.prisionerRepository = prisionerRepository;
        this.purchaseRepository = purchaseRepository;
        this.pressWorkRepository = pressWorkRepository;
    }

    public List<PurchaseDTO> getPrisionerPurchases(Long id) {
        List<PurchaseDTO> purchaseList = new ArrayList<>();
        prisionerRepository.findById(id).ifPresent(prisioner -> {
            purchaseRepository.findAllByPrisioner(prisioner)
                .forEach(purchase -> {
                    purchaseList.add(new PurchaseDTO(purchase));
                });

        });
        return purchaseList;
    }

    public List<WorkDTO> getPrisionerWork(Long id){
        List<WorkDTO> workList = new ArrayList<>();
        prisionerRepository.findById(id).ifPresent(prisioner -> {
            pressWorkRepository.getAllByPrisioner(prisioner)
                .stream()
                .map(PressWork::getWork)
                .forEach(work -> workList.add(new WorkDTO(work)));

        });
        return workList;
    }

}
