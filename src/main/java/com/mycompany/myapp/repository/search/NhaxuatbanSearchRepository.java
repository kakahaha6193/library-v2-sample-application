package com.mycompany.myapp.repository.search;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import com.mycompany.myapp.domain.Nhaxuatban;
import java.util.stream.Stream;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Nhaxuatban} entity.
 */
public interface NhaxuatbanSearchRepository extends ElasticsearchRepository<Nhaxuatban, Long>, NhaxuatbanSearchRepositoryInternal {}

interface NhaxuatbanSearchRepositoryInternal {
    Stream<Nhaxuatban> search(String query);
}

class NhaxuatbanSearchRepositoryInternalImpl implements NhaxuatbanSearchRepositoryInternal {

    private final ElasticsearchRestTemplate elasticsearchTemplate;

    NhaxuatbanSearchRepositoryInternalImpl(ElasticsearchRestTemplate elasticsearchTemplate) {
        this.elasticsearchTemplate = elasticsearchTemplate;
    }

    @Override
    public Stream<Nhaxuatban> search(String query) {
        NativeSearchQuery nativeSearchQuery = new NativeSearchQuery(queryStringQuery(query));
        return elasticsearchTemplate.search(nativeSearchQuery, Nhaxuatban.class).map(SearchHit::getContent).stream();
    }
}
