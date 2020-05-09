package com.lustprision.admin.service;

import com.lustprision.admin.domain.*;
import com.lustprision.admin.repository.*;
import com.lustprision.admin.service.dto.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
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

    private final PrisQuizRepository prisQuizRepository;

    private QuizService quizService;

    public PrisionerService(PrisionerRepository prisionerRepository, PurchaseRepository purchaseRepository,
                            PressWorkRepository pressWorkRepository, PrisQuizRepository prisQuizRepository) {
        this.prisionerRepository = prisionerRepository;
        this.purchaseRepository = purchaseRepository;
        this.pressWorkRepository = pressWorkRepository;
        this.prisQuizRepository = prisQuizRepository;
    }

    @Autowired
    public void setQuizService(QuizService quizService){
        this.quizService = quizService;
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
                .forEach(pressWork -> {
                        WorkDTO mWork = new WorkDTO(pressWork.getWork());
                        mWork.setPressProductId(pressWork.getId());
                        mWork.setStateID(pressWork.getState().getId());
                        mWork.setStateName(pressWork.getState().getName());
                        workList.add(mWork);
                    });
        });
        return workList;
    }

    public List<CompletedQuizDTO> getPrisionerQuizs(Long id){
        final List<CompletedQuizDTO>[] quizList = new List[]{new ArrayList<>()};
        prisionerRepository.findById(id).ifPresent(prisioner -> quizList[0] = quizService.getPrisonerCompletedQuizzes(prisioner));
        return quizList[0];
    }
}
