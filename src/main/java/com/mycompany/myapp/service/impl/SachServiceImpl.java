package com.mycompany.myapp.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.*;

import com.mycompany.myapp.domain.Sach;
import com.mycompany.myapp.repository.SachRepository;
import com.mycompany.myapp.repository.search.SachSearchRepository;
import com.mycompany.myapp.service.SachService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Sach}.
 */
@Service
@Transactional
public class SachServiceImpl implements SachService {

    private final Logger log = LoggerFactory.getLogger(SachServiceImpl.class);

    private final SachRepository sachRepository;

    private final SachSearchRepository sachSearchRepository;

    public SachServiceImpl(SachRepository sachRepository, SachSearchRepository sachSearchRepository) {
        this.sachRepository = sachRepository;
        this.sachSearchRepository = sachSearchRepository;
    }

    @Override
    public Sach save(Sach sach) {
        log.debug("Request to save Sach : {}", sach);
        Sach result = sachRepository.save(sach);
        sachSearchRepository.save(result);
        return result;
    }

    @Override
    public Optional<Sach> partialUpdate(Sach sach) {
        log.debug("Request to partially update Sach : {}", sach);

        return sachRepository
            .findById(sach.getId())
            .map(existingSach -> {
                if (sach.getTenSach() != null) {
                    existingSach.setTenSach(sach.getTenSach());
                }
                if (sach.getGiaNiemYet() != null) {
                    existingSach.setGiaNiemYet(sach.getGiaNiemYet());
                }
                if (sach.getTacgia() != null) {
                    existingSach.setTacgia(sach.getTacgia());
                }
                if (sach.getGiaThue() != null) {
                    existingSach.setGiaThue(sach.getGiaThue());
                }
                if (sach.getNganXep() != null) {
                    existingSach.setNganXep(sach.getNganXep());
                }
                if (sach.getTheloai() != null) {
                    existingSach.setTheloai(sach.getTheloai());
                }

                return existingSach;
            })
            .map(sachRepository::save)
            .map(savedSach -> {
                sachSearchRepository.save(savedSach);

                return savedSach;
            });
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Sach> findAll(Pageable pageable) {
        log.debug("Request to get all Saches");
        return sachRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Sach> findOne(Long id) {
        log.debug("Request to get Sach : {}", id);
        return sachRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Sach : {}", id);
        sachRepository.deleteById(id);
        sachSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Sach> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Saches for query {}", query);
        return sachSearchRepository.search(query, pageable);
    }
}
