package com.mycompany.myapp.service.impl;

import static org.elasticsearch.index.query.QueryBuilders.*;

import com.mycompany.myapp.domain.Muonsach;
import com.mycompany.myapp.repository.MuonsachRepository;
import com.mycompany.myapp.repository.search.MuonsachSearchRepository;
import com.mycompany.myapp.service.MuonsachService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Muonsach}.
 */
@Service
@Transactional
public class MuonsachServiceImpl implements MuonsachService {

    private final Logger log = LoggerFactory.getLogger(MuonsachServiceImpl.class);

    private final MuonsachRepository muonsachRepository;

    private final MuonsachSearchRepository muonsachSearchRepository;

    public MuonsachServiceImpl(MuonsachRepository muonsachRepository, MuonsachSearchRepository muonsachSearchRepository) {
        this.muonsachRepository = muonsachRepository;
        this.muonsachSearchRepository = muonsachSearchRepository;
    }

    @Override
    public Muonsach save(Muonsach muonsach) {
        log.debug("Request to save Muonsach : {}", muonsach);
        Muonsach result = muonsachRepository.save(muonsach);
        muonsachSearchRepository.save(result);
        return result;
    }

    @Override
    public Optional<Muonsach> partialUpdate(Muonsach muonsach) {
        log.debug("Request to partially update Muonsach : {}", muonsach);

        return muonsachRepository
            .findById(muonsach.getId())
            .map(existingMuonsach -> {
                if (muonsach.getNgayMuon() != null) {
                    existingMuonsach.setNgayMuon(muonsach.getNgayMuon());
                }
                if (muonsach.getHanTra() != null) {
                    existingMuonsach.setHanTra(muonsach.getHanTra());
                }
                if (muonsach.getNgayTra() != null) {
                    existingMuonsach.setNgayTra(muonsach.getNgayTra());
                }
                if (muonsach.getTrangThai() != null) {
                    existingMuonsach.setTrangThai(muonsach.getTrangThai());
                }

                return existingMuonsach;
            })
            .map(muonsachRepository::save)
            .map(savedMuonsach -> {
                muonsachSearchRepository.save(savedMuonsach);

                return savedMuonsach;
            });
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Muonsach> findAll(Pageable pageable) {
        log.debug("Request to get all Muonsaches");
        return muonsachRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Muonsach> findOne(Long id) {
        log.debug("Request to get Muonsach : {}", id);
        return muonsachRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Muonsach : {}", id);
        muonsachRepository.deleteById(id);
        muonsachSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Muonsach> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Muonsaches for query {}", query);
        return muonsachSearchRepository.search(query, pageable);
    }
}
