package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Sach;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Sach}.
 */
public interface SachService {
    /**
     * Save a sach.
     *
     * @param sach the entity to save.
     * @return the persisted entity.
     */
    Sach save(Sach sach);

    /**
     * Partially updates a sach.
     *
     * @param sach the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Sach> partialUpdate(Sach sach);

    /**
     * Get all the saches.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Sach> findAll(Pageable pageable);

    /**
     * Get the "id" sach.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Sach> findOne(Long id);

    /**
     * Delete the "id" sach.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the sach corresponding to the query.
     *
     * @param query the query of the search.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Sach> search(String query, Pageable pageable);
}
