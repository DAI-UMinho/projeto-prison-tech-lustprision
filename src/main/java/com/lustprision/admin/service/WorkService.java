package com.lustprision.admin.service;

import com.lustprision.admin.domain.Product;
import com.lustprision.admin.domain.Work;
import com.lustprision.admin.repository.*;
import com.lustprision.admin.service.dto.ProductSaleDTO;
import com.lustprision.admin.service.dto.WorkSubsDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class WorkService {

    private final Logger log = LoggerFactory.getLogger(PrisionerService.class);

    private final WorkRepository workRepository;

    private final PressWorkRepository pressWorkRepository;

    public WorkService(WorkRepository workRepository, PressWorkRepository pressWorkRepository){
        this.workRepository = workRepository;
        this.pressWorkRepository = pressWorkRepository;
    }

    public List<WorkSubsDTO> getCurrentWorkSubs(Long id){
        List<WorkSubsDTO> subs = new ArrayList<>();
        workRepository.findById(id).ifPresent(work ->
            pressWorkRepository.getAllByWork(work).forEach(pressWork -> {
                WorkSubsDTO sub = new WorkSubsDTO();
                sub.setPressID(pressWork.getId());
                sub.setPressState(pressWork.getState().getId());
                sub.setStateName(pressWork.getState().getName());
                sub.setPrisonerName(pressWork.getPrisioner().getName());
                sub.setPrisonerImage(pressWork.getPrisioner().getProfileImage());
                sub.setPrisonerImageContentType(pressWork.getPrisioner().getProfileImageContentType());
                subs.add(sub);
            }));

        return subs;
    }
}
