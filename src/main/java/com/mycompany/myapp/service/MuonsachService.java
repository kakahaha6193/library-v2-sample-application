package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Muonsach;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Muonsach}.
 */
public interface MuonsachService {
    /**
     * Save a muonsach.
     *
     * @param muonsach the entity to save.
     * @return the persisted entity.
     */
    Muonsach save(Muonsach muonsach);

    /**
     * Partially updates a muonsach.
     *
     * @param muonsach the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Muonsach> partialUpdate(Muonsach muonsach);

    /**
     * Get all the muonsaches.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Muonsach> findAll(Pageable pageable);

    /**
     * Get the "id" muonsach.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Muonsach> findOne(Long id);

    /**
     * Delete the "id" muonsach.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the muonsach corresponding to the query.
     *
     * @param query the query of the search.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Muonsach> search(String query, Pageable pageable);
}
