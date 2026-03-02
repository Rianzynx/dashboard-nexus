import { useState, useEffect, useMemo } from "react";
import { mockUsers } from "../mocks/users";
import type { UserStatus } from "../types";

export const useUsers = (itemsPerPage: number = 8) => {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const [statusFilter, setStatusFilter] = useState<UserStatus | 'ALL'>('ALL');
    const [sortBy, setSortBy] = useState<'name' | 'newest'>('name');

    // Estados temporarios para o Popover
    const [tempStatus, setTempStatus] = useState(statusFilter);
    const [tempSort, setTempSort] = useState(sortBy);

    useEffect(() => {
        if (showFilters) {
            setTempStatus(statusFilter);
            setTempSort(sortBy);
        }
    }, [showFilters, statusFilter, sortBy]);

    // Lógica de filtragem e ordenação memorizada 
    const filteredUsers = useMemo(() => {
        return mockUsers
            .filter(user => {
                const matchesSearch =
                    user.name.toLowerCase().includes(search.toLowerCase()) ||
                    user.email.toLowerCase().includes(search.toLowerCase());
                const matchesStatus = statusFilter === 'ALL' || user.status === statusFilter;
                return matchesSearch && matchesStatus;
            })
            .sort((a, b) => {
                if (sortBy === 'name') return a.name.localeCompare(b.name);
                if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                return 0;
            });
    }, [search, statusFilter, sortBy]);

    // Paginação
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const currentUsers = useMemo(() => {
        const first = (currentPage - 1) * itemsPerPage;
        return filteredUsers.slice(first, first + itemsPerPage);
    }, [filteredUsers, currentPage, itemsPerPage]);

    // Funções de ação
    const applyFilters = () => {
        setStatusFilter(tempStatus);
        setSortBy(tempSort);
        setCurrentPage(1);
        setShowFilters(false);
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    return {
        currentUsers,
        totalResults: filteredUsers.length,
        search,
        currentPage,
        totalPages,
        showFilters,
        tempStatus,
        tempSort,
        setShowFilters,
        setTempStatus,
        setTempSort,
        setCurrentPage,
        handleSearch,
        applyFilters
    };
};