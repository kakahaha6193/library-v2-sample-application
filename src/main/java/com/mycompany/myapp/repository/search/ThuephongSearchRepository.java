package com.mycompany.myapp.repository.search;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import com.mycompany.myapp.domain.Thuephong;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Thuephong} entity.
 */
public interface ThuephongSearchRepository extends ElasticsearchRepository<Thuephong, Long>, ThuephongSearchRepositoryInternal {}

interface ThuephongSearchRepositoryInternal {
    Page<Thuephong> search(String query, Pageable pageable);
}

class ThuephongSearchRepositoryInternalImpl implements ThuephongSearchRepositoryInternal {

    private final ElasticsearchRestTemplate elasticsearchTemplate;

    ThuephongSearchRepositoryInternalImpl(ElasticsearchRestTemplate elasticsearchTemplate) {
        this.elasticsearchTemplate = elasticsearchTemplate;
    }

    @Override
    public Page<Thuephong> search(String query, Pageable pageable) {
        NativeSearchQuery nativeSearchQuery = new NativeSearchQuery(queryStringQuery(query));
        nativeSearchQuery.setPageable(pageable);
        List<Thuephong> hits = elasticsearchTemplate
            .search(nativeSearchQuery, Thuephong.class)
            .map(SearchHit::getContent)
            .stream()
            .collect(Collectors.toList());

        return new PageImpl<>(hits, pageable, hits.size());
    }
}
